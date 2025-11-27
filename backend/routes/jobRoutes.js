const express = require('express');
const router = express.Router();
const { getAllJobs, getJobById } = require('../controllers/jobController');

// WHY: Public route to fetch all jobs - no authentication required
router.get('/', getAllJobs);

// WHY: Public route to fetch single job by ID - no authentication required
router.get('/:id', getJobById);

module.exports = router;
