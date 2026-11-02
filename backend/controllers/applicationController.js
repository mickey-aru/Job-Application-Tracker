const applications = require('../db/applications');

// Each function handles one request: read input, call the db, send the response.

async function getApplications(req, res) {
  const { status, search } = req.query;
  res.json(await applications.getAll(status, search));
}

async function getStats(req, res) {
  const rows = await applications.countByStatus();
  const stats = { Total: 0, Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
  rows.forEach((r) => {
    stats[r.status] = r.count;
    stats.Total += r.count;
  });
  res.json(stats);
}

async function addApplication(req, res) {
  const { company, role } = req.body;
  if (!company || !role) {
    return res.status(400).json({ error: 'company and role are required' });
  }
  await applications.create(req.body);
  res.status(201).json({ message: 'Application added' });
}

async function updateApplication(req, res) {
  const changed = await applications.update(req.params.id, req.body);
  if (changed === 0) return res.status(404).json({ error: 'Application not found' });
  res.json({ message: 'Application updated' });
}

async function deleteApplication(req, res) {
  const deleted = await applications.remove(req.params.id);
  if (deleted === 0) return res.status(404).json({ error: 'Application not found' });
  res.json({ message: 'Application deleted' });
}

module.exports = {
  getApplications,
  getStats,
  addApplication,
  updateApplication,
  deleteApplication,
};
