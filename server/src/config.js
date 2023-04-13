require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000,
    slack: {
        token: process.env.SLACK_BOT_TOKEN,
        secret: process.env.SLACK_SIGNING_SECRET,
        channel: process.env.SLACK_CHANNEL_ID,
        socketMode:true,
    }
}