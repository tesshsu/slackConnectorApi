const { App } = require("@slack/bolt");
const config = require('./config');
const pool = require('./database');
const jwt = require('jsonwebtoken');

const slackApp = new App({
    token: config.slack.bot_token,
    signingSecret: config.slack.secret,
    appToken: config.slack.app_token,
    socketMode: true,
});

// Check if the access token has expired and refresh it if necessary
async function getAccessToken(context) {
    let token = context.access_token;
    const decoded = jwt.decode(token);
    const now = Math.floor(Date.now() / 1000);
    // TODO: Add argument redirect_uri with https protocol to allow Slack to redirect to your app
    if (decoded.exp < now) {
        console.log('Access token has expired, refreshing...');
        const result = await slackApp.client.oauth.v2.access({
            client_id: config.slack.client_id,
            client_secret: config.slack.client_secret,
            refresh_token: context.refresh_token,
            code: context.code,
            redirect_uri: config.slack.redirect_uri,
        });
        token = result.access_token;
        context.access_token = token;
    }
    return token;
}

// Use OAuth 2.0 to authorize users as middleware
slackApp.use(async ({ next, context }) => {
    try {
        if (context.botUserId) {
            console.log('Bot user ID is already available')
            await next();
        } else {
            const token = await getAccessToken(context);
            const result = await slackApp.client.conversations.list({
                token,
            });
            context.botUserId = result.authed_user.id;
            context.refresh_token = result.refresh_token; // save the refresh token
            await next();
        }
    } catch (err) {
        console.error(`Error once authorize by middleware OAuth2: ${err}`);
    }
});

module.exports = () => {
    slackApp.start()
        .then(() => {
            console.log('⚡️[server]: Slack Bolt app is running');
        })
        .catch((err) => {
            console.error(`Error starting Slack Bolt app: ${err}`);
        });

    slackApp.client.chat.postMessage({
        channel: config.slack.channel,
        text: 'Hello world!',
    });

    const now = new Date();
    const today = now.toLocaleDateString(undefined, {timeZone: 'Europe/Paris'});
    const targetTime = new Date(`${today} 9:00:00`).getTime() / 1000;
    // If the target time has already passed for today, schedule for tomorrow instead
    const postAt = targetTime < now.getTime() / 1000 ? targetTime + 86400 : targetTime;

    const message = {
        channel: config.slack.channel,
        text: 'Hello, do you have any plans for today?',
    };

    slackApp.client.chat.scheduleMessage({
        channel: message.channel,
        text: message.text,
        post_at: postAt,
    }).then((result) => {
        console.log('Message scheduled successfully:', result);
    }).catch((error) => {
        console.error('Failed to schedule message:', error);
    });

    slackApp.message(/[a-z]/, async ({context, say}) => {
        try {
            const userId = context.botUserId ? context.botUserId : context.user;
            const messageText = context.matches.input;
            const greeting = context.botUserId ? 'Hello there' : 'Hello';
            await say(`${greeting}, message received`);
            const client = await pool.connect();
            if(client){
                const result = await client.query(
                    "INSERT INTO integration_logs (user_id, message) VALUES ($1, $2)",
                    [userId, messageText]
                );
                console.log("Message inserted into integration_logs table:", result.rows);
                client.release();
            }
        } catch (error) {
            console.error('Error to listens incoming message: ', error);
        }
    });
};
