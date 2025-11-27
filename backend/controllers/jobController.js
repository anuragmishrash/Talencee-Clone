const Job = require('../models/Job');

// WHY: Controller to fetch all job listings
// Returns jobs sorted by creation date (newest first) for better user experience
const getAllJobs = async (req, res, next) => {
  try {
    // WHY: Fetch all jobs and sort by createdAt descending (newest first)
    const jobs = await Job.find().sort({ createdAt: -1 });
    
    // WHY: Return jobs array to client
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
    
  } catch (error) {
    // WHY: Pass error to global error handler
    next(error);
  }
};

// WHY: Controller to fetch a single job by ID
// Allows users to view detailed information about a specific job
const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // WHY: Find job by ID
    const job = await Job.findById(id);
    
    // WHY: Return 404 if job doesn't exist
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // WHY: Return job data to client
    res.status(200).json({
      success: true,
      data: job
    });
    
  } catch (error) {
    // WHY: Handle invalid MongoDB ObjectId format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Job not found - Invalid ID format'
      });
    }
    
    // WHY: Pass other errors to global error handler
    next(error);
  }
};

module.exports = {
  getAllJobs,
  getJobById
};
