const { Pool } = require("pg");
const config = require('./config');

const pool = new Pool({
    user: config.dbb.user,
    host: config.dbb.host,
    database: config.dbb.database,
    password: config.dbb.password,
    port: config.dbb.port,
});

module.exports = pool;
