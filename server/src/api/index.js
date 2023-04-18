const express = require('express');
const integrationLogsRouter = require('./integration-logs');

const app = express();

app.use('/integration-logs', integrationLogsRouter);

module.exports = app;

