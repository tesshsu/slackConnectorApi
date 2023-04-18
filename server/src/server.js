const express = require('express');
const bodyParser = require('body-parser');
const slackApp = require('./slack');
const app = express();
const port = 3000;
const router = express.Router();
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    slackApp();
});
