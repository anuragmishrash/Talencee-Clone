const mongoose = require('mongoose');

// WHY: Define schema for website content to store all dynamic text and configuration
// This allows non-technical users to update website content without code changes
const contentSchema = new mongoose.Schema({
  hero: {
    title: {
      type: String,
      required: [true, 'Hero title is required'],
      trim: true
    },
    subtitle: {
      type: String,
      required: [true, 'Hero subtitle is required'],
      trim: true
    },
    buttonText: {
      type: String,
      required: [true, 'Hero button text is required'],
      trim: true
    }
  },
  services: [{
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      trim: true
    },
    icon: {
      type: String,
      trim: true
    }
  }],
  features: [{
    title: {
      type: String,
      required: [true, 'Feature title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Feature description is required'],
      trim: true
    },
    icon: {
      type: String,
      trim: true
    }
  }],
  testimonials: [{
    name: {
      type: String,
      required: [true, 'Testimonial name is required'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Testimonial role is required'],
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Testimonial message is required'],
      trim: true
    },
    avatar: {
      type: String,
      trim: true
    }
  }],
  footer: {
    links: [{
      text: {
        type: String,
        required: true,
        trim: true
      },
      url: {
        type: String,
        required: true,
        trim: true
      }
    }],
    social: [{
      platform: {
        type: String,
        required: true,
        trim: true
      },
      url: {
        type: String,
        required: true,
        trim: true
      }
    }],
    copyright: {
      type: String,
      required: true,
      trim: true
    }
  },
  cta: {
    buttonText: {
      type: String,
      required: [true, 'CTA button text is required'],
      trim: true
    },
    modalTitle: {
      type: String,
      required: [true, 'CTA modal title is required'],
      trim: true
    }
  }
}, {
  // WHY: Automatically add updatedAt timestamp when content is modified
  timestamps: { createdAt: false, updatedAt: true }
});

// WHY: Export model for use in controllers
module.exports = mongoose.model('Content', contentSchema);
