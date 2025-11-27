const mongoose = require('mongoose');

// WHY: Define schema for job applications to store applicant information
const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    // WHY: Validate email format to ensure data quality
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    // WHY: jobId is optional - applications can be general or job-specific
    required: false
  },
  resumePath: {
    type: String,
    required: [true, 'Resume file is required'],
    trim: true
  }
}, {
  // WHY: Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// WHY: Create indexes for efficient querying
applicationSchema.index({ createdAt: -1 });
applicationSchema.index({ email: 1 });

// WHY: Export model for use in controllers
module.exports = mongoose.model('Application', applicationSchema);
