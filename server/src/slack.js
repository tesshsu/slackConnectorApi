const { App } = require('@slack/bolt');
const config = require('./config');
const { createEventAdapter } = require('@slack/events-api');
const slackEvents = createEventAdapter(config.slack.secret);

function handleSlackEvent(event, res) {
    console.log(`Received a ${event.type} event`);
    res.sendStatus(200);
}

function slackEventHandler() {
    return (req, res) => {
        const events = req.body;
        events.forEach((event) => {
            handleSlackEvent(event, res);
        });
    };
}

module.exports = {
    expressMiddleware: slackEvents.expressMiddleware.bind(slackEvents),
    slackEventHandler
};
