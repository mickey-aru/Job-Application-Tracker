const pool = require('./pool');

// All SQL for the applications table lives here.

async function getAll(status, search) {
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
  return rows;
}

async function countByStatus() {
  const [rows] = await pool.execute(
    'SELECT status, COUNT(*) AS count FROM applications GROUP BY status'
  );
  return rows;
}

async function create({ company, role, job_url, status, applied_date, notes }) {
  await pool.execute(
    `INSERT INTO applications (company, role, job_url, status, applied_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [company, role, job_url || null, status || 'Applied', applied_date, notes || null]
  );
}

// Returns the number of rows changed (0 means the id was not found)
async function update(id, { company, role, job_url, status, applied_date, notes }) {
  const [result] = await pool.execute(
    `UPDATE applications
     SET company = ?, role = ?, job_url = ?, status = ?, applied_date = ?, notes = ?
     WHERE id = ?`,
    [company, role, job_url || null, status, applied_date, notes || null, id]
  );
  return result.affectedRows;
}

// Returns the number of rows deleted (0 means the id was not found)
async function remove(id) {
  const [result] = await pool.execute('DELETE FROM applications WHERE id = ?', [id]);
  return result.affectedRows;
}

module.exports = { getAll, countByStatus, create, update, remove };
