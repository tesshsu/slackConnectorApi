const bodyParser = require('body-parser');
const slackApp = require('./slack');
const app = require('./api');
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    slackApp();
});
