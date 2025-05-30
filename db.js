const configs = require('./configs');
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    uri: configs.db.DATABASE_URI,
    connectionLimit: configs.db.poolSize,
    waitForConnections: true
});


module.exports = connection