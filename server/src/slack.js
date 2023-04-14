const { App } = require("@slack/bolt");
const config = require('./config');

const slackApp = new App({
    token: config.slack.bot_token,
    signingSecret: config.slack.secret,
    appToken: config.slack.app_token,
    socketMode: true,
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
    const message = {
        channel: config.slack.channel,
        text: 'Hello, do you have any plans for today?',
    };

    slackApp.client.chat.scheduleMessage({
        channel: message.channel,
        text: message.text,
        post_at: Math.floor(now.getTime() / 1000) + 600,
    }).then((result) => {
        console.log('Message scheduled successfully:', result);
    }).catch((error) => {
        console.error('Failed to schedule message:', error);
    });

    slackApp.message(/[a-z]/, async ({context, say}) => {
        try {
            const greeting = context.botUserId ? 'Hello there' : 'Hello';
            await say(`${greeting}, message received`);
        } catch (error) {
            console.error('Error to listens incoming message: ', error);
        }
    });
};
