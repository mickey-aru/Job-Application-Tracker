USE job_tracker;

INSERT INTO applications (company, role, job_url, status, applied_date, notes) VALUES
  ('Infosys',    'Junior Backend Developer', 'https://www.infosys.com/careers',            'Applied',   '2026-10-20', 'Applied through the careers page'),
  ('Zoho',       'Software Developer',       'https://www.zoho.com/careers',               'Interview', '2026-10-15', 'Technical round on 30 Oct'),
  ('TCS',        'Node.js Developer',        NULL,                                         'Offer',     '2026-10-05', 'Offer received, reply by 5 Nov'),
  ('Freshworks', 'Associate Engineer',       'https://www.freshworks.com/company/careers', 'Rejected',  '2026-09-28', 'Rejected after coding test'),
  ('Wipro',      'Backend Trainee',          NULL,                                         'Applied',   '2026-10-24', 'Referred by a friend'),
  ('Cognizant',  'Programmer Analyst Trainee','https://careers.cognizant.com',             'Applied',   '2026-10-22', 'Waiting for online assessment link'),
  ('HCLTech',    'Graduate Engineer Trainee','https://www.hcltech.com/careers',            'Interview', '2026-10-12', 'HR round scheduled for next week'),
  ('Accenture',  'Associate Software Engineer','https://www.accenture.com/in-en/careers',  'Rejected',  '2026-09-18', 'Did not clear the aptitude round'),
  ('Capgemini',  'Analyst',                  NULL,                                         'Applied',   '2026-10-25', 'Applied through campus portal'),
  ('Tech Mahindra','Software Engineer',      'https://careers.techmahindra.com',           'Interview', '2026-10-10', 'Technical interview done, awaiting result'),
  ('Razorpay',   'Backend Engineer Intern',  'https://razorpay.com/jobs',                  'Applied',   '2026-10-18', 'Sent resume with GitHub link'),
  ('Swiggy',     'SDE 1',                    'https://careers.swiggy.com',                 'Rejected',  '2026-09-30', 'Not shortlisted'),
  ('Paytm',      'Java Backend Developer',   NULL,                                         'Interview', '2026-10-08', 'System design basics round next'),
  ('Hexaware',   'Software Engineer Trainee','https://hexaware.com/careers',               'Offer',     '2026-10-01', 'Offer letter received, joining in January'),
  ('Mphasis',    'Trainee Developer',        NULL,                                         'Applied',   '2026-10-26', 'Applied via LinkedIn'),
  ('Zeta',       'Backend Developer',        'https://www.zeta.tech/careers',              'Applied',   '2026-10-21', 'Referred by a college senior'),
  ('Chargebee',  'Associate Software Engineer','https://www.chargebee.com/careers',        'Interview', '2026-10-14', 'Machine coding round on Friday'),
  ('Ola',        'Software Engineer',        NULL,                                         'Rejected',  '2026-09-25', 'Position closed'),
  ('Kissflow',   'Junior Node.js Developer', 'https://kissflow.com/careers',               'Applied',   '2026-10-23', 'Mentioned the job tracker project in the cover note'),
  ('Sify',       'Backend Developer Trainee',NULL,                                         'Offer',     '2026-10-03', 'Verbal offer, waiting for written confirmation');
