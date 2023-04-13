const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const {App} = require("@slack/bolt");
const app = express();
const port = config.port;
const now = new Date();
// Construct the message payload
const message = {
    channel: config.slack.channel,
    text: 'Hello, do you have any plans for today?',
};

app.use(bodyParser.json());

// Slack configuration
const slackApp = new App({
    token: config.slack.bot_token,
    signingSecret: config.slack.secret,
    appToken: config.slack.app_token,
    socketMode: true,
});

app.listen(port, async () => {
    await slackApp.start(process.env.PORT || port);
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

slackApp.client.chat.postMessage({
    channel: config.slack.channel,
    text: 'Hello world!',
});


// Listens to incoming messages that contain any characters
slackApp.message(/[a-z]/, async ({context, say}) => {
    try {
        const greeting = context.botUserId ? 'Hello there' : 'Hello';
        await say(`${greeting}, message received`);
    } catch (error) {
        console.log("err")
        console.error(error);
    }
});
// Schedule the message
slackApp.client.chat.scheduleMessage({
    channel: message.channel,
    text: message.text,
    post_at: Math.floor(now.getTime() / 1000) + 600,
}).then((result) => {
    console.log('Message scheduled successfully:', result);
}).catch((error) => {
    console.error('Failed to schedule message:', error);
});

module.exports = slackApp;