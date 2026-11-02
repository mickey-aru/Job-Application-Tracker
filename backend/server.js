const express = require('express');
const path = require('path');
const applicationsRouter = require('./routes/applications');

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

app.listen(PORT, () => {
  console.log(`Job tracker running at http://localhost:${PORT}`);
});
