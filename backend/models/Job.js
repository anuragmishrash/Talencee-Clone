const mongoose = require('mongoose');

// WHY: Define schema for job listings to store all job-related information (Indian context)
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Job type is required'],
    enum: {
      values: ['Full-time', 'Part-time', 'Contract', 'Internship'],
      message: '{VALUE} is not a valid job type'
    }
  },
  ctc: {
    type: String,
    trim: true,
    default: 'Not Disclosed'
  },
  experience: {
    type: String,
    trim: true,
    default: '0-2 years'
  },
  workMode: {
    type: String,
    enum: ['Onsite', 'Remote', 'Hybrid'],
    default: 'Onsite'
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  companyOverview: {
    type: String,
    trim: true,
    default: 'Talencee India is a leading technology company.'
  },
  responsibilities: {
    type: [String],
    default: []
  },
  requirements: {
    type: [String],
    required: [true, 'Job requirements are required'],
    validate: {
      validator: function(arr) {
        // WHY: Ensure at least one requirement is provided
        return arr && arr.length > 0;
      },
      message: 'At least one requirement must be provided'
    }
  },
  perks: {
    type: [String],
    default: []
  },
  hiringProcess: {
    type: [String],
    default: []
  }
}, {
  // WHY: Automatically add createdAt and updatedAt timestamps
  timestamps: true
});

// WHY: Create index on createdAt for efficient sorting of jobs by date
jobSchema.index({ createdAt: -1 });

// WHY: Export model for use in controllers
module.exports = mongoose.model('Job', jobSchema);
