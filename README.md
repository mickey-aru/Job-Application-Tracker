# Job Application Tracker

A simple full-stack app for job seekers to log every job they apply to and track its status (Applied, Interview, Offer, Rejected) in one place.

**Stack:** Node.js, Express, MySQL (mysql2), HTML/CSS/JavaScript

## Features
- Add, view, edit and delete job applications
- Filter by status and search by company
- Dashboard counts per status
- Required-field check and JSON error responses

## Run locally
Requires MySQL running locally.

1. Create the database and table, and load sample data (optional):
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```
2. Start the app:
```bash
cd backend
npm install
npm start
```

Default connection is `root` with no password on `localhost:3306`. To change it, set environment variables:
```bash
DB_HOST=localhost DB_USER=root DB_PASSWORD=yourpassword DB_NAME=job_tracker npm start
```
Open http://localhost:3000.

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications?status=Interview&search=google` | List applications (filters optional) |
| GET | `/api/applications/stats` | Total count and count per status |
| POST | `/api/applications` | Create an application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

Example request body:
```json
{
  "company": "Acme",
  "role": "Backend Developer",
  "job_url": "https://acme.com/jobs/1",
  "status": "Applied",
  "applied_date": "2026-10-27",
  "notes": "Referred by a friend"
}
```

## Database
```
applications(id, company, role, job_url, status, applied_date, notes, created_at)
```
`status` is an `ENUM` restricted to Applied / Interview / Offer / Rejected.

## Project structure
```
backend/
  server.js              Express app setup, error handling
  db.js                  MySQL connection pool
  routes/applications.js CRUD + stats endpoints
frontend/
  index.html, style.css, app.js
database/
  schema.sql             Creates the database and table
  seed.sql               Sample data
```
The backend serves the frontend files, so one command runs everything.

## What I learned
- Designing a REST API with CRUD and proper status codes (201, 400, 404)
- A required-field check and a central error handler
- SQL with parameterized queries (prevents SQL injection), filtering, and `GROUP BY`
- Serving a static frontend from Express
