const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendApplicationEmail, sendAcknowledgmentEmail } = require('../services/emailService');

// WHY: Controller to handle application submission with resume upload
// This processes job applications, saves them to database, and sends email notifications
const submitApplication = async (req, res, next) => {
  try {
    const { name, email, subject, message, jobId } = req.body;
    
    // WHY: Check if resume file was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Resume file is required'
      });
    }
    
    // WHY: Get resume file path from multer
    const resumePath = req.file.path;
    
    // WHY: Prepare application data
    const applicationData = {
      name,
      email,
      subject,
      message,
      resumePath
    };
    
    // WHY: Add jobId if provided and validate it exists
    let jobTitle = null;
    if (jobId) {
      const job = await Job.findById(jobId);
      if (job) {
        applicationData.jobId = jobId;
        jobTitle = job.title;
      }
    }
    
    // WHY: Save application to database
    const application = await Application.create(applicationData);
    
    // WHY: Prepare email data
    const emailData = {
      name,
      email,
      subject,
      message,
      jobTitle
    };
    
    // WHY: Send notification email to HR (don't wait for it)
    sendApplicationEmail(emailData, resumePath)
      .then(result => {
        if (result.success) {
          console.log('✅ HR notification email sent');
        } else {
          console.error('❌ HR notification email failed:', result.error);
        }
      })
      .catch(err => {
        console.error('❌ Email error:', err);
      });
    
    // WHY: Send acknowledgment email to applicant (optional, don't wait)
    sendAcknowledgmentEmail(email, name)
      .then(result => {
        if (result.success) {
          console.log('✅ Acknowledgment email sent to applicant');
        }
      })
      .catch(err => {
        console.error('❌ Acknowledgment email error:', err);
      });
    
    // WHY: Return success response immediately (don't wait for emails)
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: {
        id: application._id,
        name: application.name,
        email: application.email,
        submittedAt: application.createdAt
      }
    });
    
  } catch (error) {
    // WHY: Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    // WHY: Pass other errors to global error handler
    next(error);
  }
};

module.exports = {
  submitApplication
};
