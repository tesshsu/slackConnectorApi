const { App } = require("@slack/bolt");
const config = require('./config');
const { Pool } = require("pg");

const slackApp = new App({
    token: config.slack.bot_token,
    signingSecret: config.slack.secret,
    appToken: config.slack.app_token,
    socketMode: true,
});

const pool = new Pool({
    user: config.dbb.user,
    host: config.dbb.host,
    database: config.dbb.database,
    password: config.dbb.password,
    port: config.dbb.port,
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
