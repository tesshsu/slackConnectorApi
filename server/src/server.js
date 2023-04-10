const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const slack = require('./slack');

const app = express();
app.use(bodyParser.json());

const port = config.port;

app.use('/slack/events', slack.expressMiddleware());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;