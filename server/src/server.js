const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const slack = require('./slack');
const { App } = require("@slack/bolt");


const app = express();
app.use(bodyParser.json());

const port = config.port;

app.use('/slack/events', slack.expressMiddleware());

const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

(async () => {
    const port = 3000
    // Start your app
    await slackApp.start(process.env.PORT || port);
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();


    console.log(`Server listening on port ${port}`);
    const requestChannel = 'C012HUN4LUR';

    slackApp.client.chat.postMessage({
        channel: 'C012HUN4LUR',
        text: 'Hello world!',
    });


    //
    slackApp.message("knock", async ({ message, say }) => {
        console.log(message);
        try {
            await say("message recu");
        } catch (error) {
            console.log("err")
            console.error(error);
        }
    });
    slackApp.message(/^(hi|hello|hey).*/, async ({ context, say }) => {
        console.log(context);
        // RegExp matches are inside of context.matches
        const greeting = context.matches[0];

        await say(`${greeting}, how are you?`);
    });

    const local_hour = Math.floor(new Date().getTime() / 1000) + 20;
    console.log(local_hour);
    const result = slackApp.client.chat.scheduleMessage({
        channel: requestChannel,
        post_at: local_hour,
        text: 'Summer has come and passed'
    });

module.exports = slackApp;