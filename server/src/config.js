require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000,
    slack: {
        bot_token: process.env.SLACK_BOT_TOKEN,
        secret: process.env.SLACK_SIGNING_SECRET,
        app_token: process.env.SLACK_APP_TOKEN,
        channel: process.env.SLACK_CHANNEL_ID,
    }
}