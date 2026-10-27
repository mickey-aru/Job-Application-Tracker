const express = require('express');
const path = require('path');
const applicationsRouter = require('./routes/applications');
const pool = require('./db.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/applications', applicationsRouter);

// Handles any error thrown in the routes
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

async function start() {
  const port = Number(process.env.PORT) || 5000;

  // Check the database early so a bad .env is obvious. The server still starts,
  // and API calls will return a friendly "database unavailable" message.
  try {
    await pool.query('SELECT 1');
    console.log('MySQL connection OK.');
  } catch (err) {
    console.error(`Could not connect to MySQL (${err.code || err.message}). Check backend/.env and that MySQL is running.`);
  }

  app.listen(port, () => console.log(`API running at http://localhost:${port}`));
}

// Only start listening when run directly (node src/app.js), not when imported.
if (require.main === module) {
  start();
}

