CREATE DATABASE IF NOT EXISTS job_tracker;
USE job_tracker;

CREATE TABLE IF NOT EXISTS applications (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  company      VARCHAR(255) NOT NULL,
  role         VARCHAR(255) NOT NULL,
  job_url      VARCHAR(500),
  status       ENUM('Applied', 'Interview', 'Offer', 'Rejected') NOT NULL DEFAULT 'Applied',
  applied_date DATE NOT NULL,
  notes        TEXT,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
