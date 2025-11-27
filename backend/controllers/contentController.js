const Content = require('../models/Content');

// WHY: Controller to fetch all website content
// This allows the frontend to dynamically load all text and configuration
const getContent = async (req, res, next) => {
  try {
    // WHY: Find the first (and should be only) content document
    const content = await Content.findOne();
    
    // WHY: If no content exists, return empty structure
    if (!content) {
      return res.status(200).json({
        success: true,
        data: null,
        message: 'No content found. Please create initial content.'
      });
    }
    
    // WHY: Return content data to client
    res.status(200).json({
      success: true,
      data: content
    });
    
  } catch (error) {
    // WHY: Pass error to global error handler
    next(error);
  }
};

// WHY: Controller to update website content (admin only)
// This allows administrators to modify website content without code changes
const updateContent = async (req, res, next) => {
  try {
    const { hero, services, features, testimonials, footer, cta } = req.body;
    
    // WHY: Validate that required sections are provided
    if (!hero || !footer || !cta) {
      return res.status(400).json({
        success: false,
        message: 'Hero, footer, and CTA sections are required'
      });
    }
    
    // WHY: Check if content document exists
    let content = await Content.findOne();
    
    if (content) {
      // WHY: Update existing content document
      content.hero = hero;
      content.services = services || [];
      content.features = features || [];
      content.testimonials = testimonials || [];
      content.footer = footer;
      content.cta = cta;
      
      await content.save();
    } else {
      // WHY: Create new content document if none exists
      content = await Content.create({
        hero,
        services: services || [],
        features: features || [],
        testimonials: testimonials || [],
        footer,
        cta
      });
    }
    
    // WHY: Return updated content to client
    res.status(200).json({
      success: true,
      data: content,
      message: 'Content updated successfully'
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
  getContent,
  updateContent
};
