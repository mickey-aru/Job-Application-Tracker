const API = '/api/applications';

const STATUS_COLORS = {
  Applied: '#2563eb',
  Interview: '#d97706',
  Offer: '#16a34a',
  Rejected: '#dc2626',
};

const modal = document.getElementById('modal');
const form = document.getElementById('app-form');
const list = document.getElementById('list');
const errorEl = document.getElementById('error');
const fields = ['company', 'role', 'job_url', 'applied_date', 'status', 'notes'];

let applications = [];

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text ?? '';
  return div.innerHTML;
}

function formatDate(value) {
  return new Date(value + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function percent(part, total) {
  return total ? Math.round((part / total) * 100) : 0;
}

// ---------- Dashboard ----------

function renderStats(stats) {
  document.getElementById('stats').innerHTML = Object.entries(stats)
    .map(([status, count]) => `<div class="stat ${status}"><span>${status}</span><strong>${count}</strong></div>`)
    .join('');

  renderDonut(stats);
  renderKpis(stats);
}

function renderDonut(stats) {
  const total = stats.Total;
  document.getElementById('donut-total').textContent = total;

  let start = 0;
  const slices = [];
  Object.keys(STATUS_COLORS).forEach((status) => {
    const size = total ? (stats[status] / total) * 100 : 0;
    if (size > 0) slices.push(`${STATUS_COLORS[status]} ${start}% ${start + size}%`);
    start += size;
  });
  document.getElementById('donut').style.background = slices.length
    ? `conic-gradient(${slices.join(', ')})`
    : '#e2e8f0';

  document.getElementById('legend').innerHTML = Object.keys(STATUS_COLORS)
    .map((status) => `
      <li>
        <span class="dot" style="background:${STATUS_COLORS[status]}"></span>
        ${status}
        <span class="pct">${stats[status]} (${percent(stats[status], total)}%)</span>
      </li>`)
    .join('');
}

function renderKpis(stats) {
  const total = stats.Total;
  const active = stats.Applied + stats.Interview;
  const kpis = [
    ['Interview rate', `${percent(stats.Interview + stats.Offer, total)}%`],
    ['Offer rate', `${percent(stats.Offer, total)}%`],
    ['Still in progress', active],
    ['Rejection rate', `${percent(stats.Rejected, total)}%`],
  ];
  document.getElementById('kpis').innerHTML = kpis
    .map(([label, value]) => `<div class="kpi"><span>${label}</span><strong>${value}</strong></div>`)
    .join('');
}

async function loadStats() {
  renderStats(await (await fetch(`${API}/stats`)).json());
}

// ---------- Table ----------

async function loadApplications() {
  const params = new URLSearchParams();
  const search = document.getElementById('search').value.trim();
  const status = document.getElementById('filter-status').value;
  if (search) params.set('search', search);
  if (status) params.set('status', status);

  applications = await (await fetch(`${API}?${params}`)).json();
  document.getElementById('empty').hidden = applications.length > 0;

  list.innerHTML = applications
    .map((a) => `
      <tr>
        <td class="company">${a.job_url
          ? `<a href="${escapeHtml(a.job_url)}" target="_blank" rel="noopener">${escapeHtml(a.company)}</a>`
          : escapeHtml(a.company)}</td>
        <td>${escapeHtml(a.role)}</td>
        <td>${formatDate(a.applied_date)}</td>
        <td><span class="badge ${a.status}">${a.status}</span></td>
        <td class="notes">${escapeHtml(a.notes)}</td>
        <td class="actions">
          <button class="small" data-action="edit" data-id="${a.id}">Edit</button>
          <button class="small danger" data-action="delete" data-id="${a.id}">Delete</button>
        </td>
      </tr>`)
    .join('');
}

function refresh() {
  loadStats();
  loadApplications();
}

list.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-action]');
  if (!button) return;
  const id = Number(button.dataset.id);
  if (button.dataset.action === 'edit') {
    openModal(applications.find((a) => a.id === id));
  } else {
    deleteApplication(id);
  }
});

async function deleteApplication(id) {
  if (!confirm('Delete this application?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  refresh();
}

// ---------- Add / edit modal ----------

function openModal(app) {
  form.reset();
  errorEl.textContent = '';
  document.getElementById('app-id').value = app ? app.id : '';
  document.getElementById('form-title').textContent = app ? 'Edit Application' : 'Add Application';
  document.getElementById('submit-btn').textContent = app ? 'Save' : 'Add';

  if (app) {
    fields.forEach((f) => (document.getElementById(f).value = app[f] ?? ''));
  } else {
    document.getElementById('applied_date').valueAsDate = new Date();
  }
  modal.hidden = false;
  document.getElementById('company').focus();
}

function closeModal() {
  modal.hidden = true;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('app-id').value;
  const body = Object.fromEntries(fields.map((f) => [f, document.getElementById(f).value]));

  const res = await fetch(id ? `${API}/${id}` : API, {
    method: id ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    errorEl.textContent = (await res.json()).error;
    return;
  }
  closeModal();
  refresh();
});

document.getElementById('open-modal').addEventListener('click', () => openModal());
document.getElementById('cancel-btn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

document.getElementById('search').addEventListener('input', loadApplications);
document.getElementById('filter-status').addEventListener('change', loadApplications);

refresh();
