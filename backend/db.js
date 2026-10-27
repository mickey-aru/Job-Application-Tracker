const mysql = require('mysql2/promise');

// The database and table are created by ../database/schema.sql
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'job_tracker',
  dateStrings: true,
});

module.exports = pool;
