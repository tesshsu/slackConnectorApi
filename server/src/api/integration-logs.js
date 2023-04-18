const express = require('express');
const router = express.Router();
const pool = require('../database');

// GET list of integration logs
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM integration_logs');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching integration logs:', error);
        res.status(500).send('Error fetching integration logs');
    }
});

module.exports = router;
