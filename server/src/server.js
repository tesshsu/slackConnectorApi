const express = require('express');
const bodyParser = require('body-parser');
const slackApp = require('./slack');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    slackApp();
});
