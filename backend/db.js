const mysql = require('mysql2/promise');

// The database and table are created by ../database/schema.sql
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  port: Number(process.env.DB_PORT || 3306),
  password: process.env.DB_PASSWORD || 'tannu',
  database: process.env.DB_NAME || 'job_tracker',
  dateStrings: true,
});

module.exports = pool;
