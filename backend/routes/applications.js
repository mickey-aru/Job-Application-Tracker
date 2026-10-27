const express = require('express');
const pool = require('../db');

const router = express.Router();

// GET /api/applications?status=Interview&search=google
router.get('/', async (req, res) => {
  const { status, search } = req.query;
  let sql = 'SELECT * FROM applications WHERE 1=1';
  const params = [];

  if (status) {
    sql += ' AND status = ?';
    params.push(status);
  }
  if (search) {
    sql += ' AND company LIKE ?';
    params.push(`%${search}%`);
  }
  sql += ' ORDER BY applied_date DESC, id DESC';

  const [rows] = await pool.execute(sql, params);
  res.json(rows);
});

// GET /api/applications/stats
router.get('/stats', async (req, res) => {
  const [rows] = await pool.execute('SELECT status, COUNT(*) AS count FROM applications GROUP BY status');
  const stats = { Total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
  rows.forEach((r) => {
    stats[r.status] = r.count;
    stats.Total += r.count;
  });
  res.json(stats);
});

// POST /api/applications
router.post('/', async (req, res) => {
  const { company, role, job_url, status, applied_date, notes } = req.body;
  if (!company || !role) {
    return res.status(400).json({ error: 'company and role are required' });
  }

  await pool.execute(
    `INSERT INTO applications (company, role, job_url, status, applied_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [company, role, job_url || null, status || 'Applied', applied_date, notes || null]
  );
  res.status(201).json({ message: 'Application added' });
});

// PUT /api/applications/:id
router.put('/:id', async (req, res) => {
  const { company, role, job_url, status, applied_date, notes } = req.body;

  const [result] = await pool.execute(
    `UPDATE applications
     SET company = ?, role = ?, job_url = ?, status = ?, applied_date = ?, notes = ?
     WHERE id = ?`,
    [company, role, job_url || null, status, applied_date, notes || null, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Application not found' });
  res.json({ message: 'Application updated' });
});

// DELETE /api/applications/:id
router.delete('/:id', async (req, res) => {
  const [result] = await pool.execute('DELETE FROM applications WHERE id = ?', [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: 'Application not found' });
  res.json({ message: 'Application deleted' });
});

module.exports = router;
