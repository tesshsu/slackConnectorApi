const { App } = require("@slack/bolt");
const dotenv = require("dotenv");

dotenv.config();

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const { WebClient } = require("@slack/web-api");
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

// Test the Slack API connection
(async () => {
    try {
        const testResponse = await web.conversations.list();
        console.log(`Connected to Slack API as ${testResponse.authed_user?.name}`);
    } catch (error) {
        console.error(`Error connecting to Slack API: ${error.message}`);
    }
})();

module.exports = { app, web };
