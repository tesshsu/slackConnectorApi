// server/src/api/integration-logs.js

const express = require('express');
const router = express.Router();
const config = require('../config');
const { Pool } = require('pg');

const pool = new Pool({
    user: config.dbb.user,
    host: config.dbb.host,
    database: config.dbb.database,
    password: config.dbb.password,
    port: config.dbb.port,
});

// GET list of integration logs
router.get('/integration-logs', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM integration_logs');
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
