require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000,
    slack: {
        bot_token: process.env.SLACK_BOT_TOKEN,
        secret: process.env.SLACK_SIGNING_SECRET,
        app_token: process.env.SLACK_APP_TOKEN,
        channel: process.env.SLACK_CHANNEL_ID,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        redirect_uri: process.env.SLACK_REDIRECT_URI,
    },
    dbb: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
}