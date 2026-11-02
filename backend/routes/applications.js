const express = require('express');
const controller = require('../controllers/applicationController');

const router = express.Router();

router.get('/', controller.getApplications);
router.get('/stats', controller.getStats);
router.post('/', controller.addApplication);
router.put('/:id', controller.updateApplication);
router.delete('/:id', controller.deleteApplication);

module.exports = router;
