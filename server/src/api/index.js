// server/src/api/index.js

const express = require('express');
const router = express.Router();

const integrationLogsRouter = require('./integration-logs');

router.use('/integration-logs', integrationLogsRouter);

module.exports = router;
