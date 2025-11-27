const { body, validationResult } = require('express-validator');

// WHY: Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// WHY: Simple HTML escape function to prevent XSS
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// WHY: Manual validation for multipart/form-data (works better with Multer)
const validateApplication = (req, res, next) => {
  // WHY: Debug logging to see what data is received
  console.log('📝 Validation - Request body:', req.body);
  console.log('📎 Validation - File:', req.file);
  
  const errors = [];
  
  // WHY: Validate name field
  if (!req.body.name || !req.body.name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (req.body.name.trim().length < 2 || req.body.name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name must be between 2 and 100 characters' });
  }
  
  // WHY: Validate email field
  if (!req.body.email || !req.body.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!emailRegex.test(req.body.email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }
  
  // WHY: Validate subject field
  if (!req.body.subject || !req.body.subject.trim()) {
    errors.push({ field: 'subject', message: 'Subject is required' });
  } else if (req.body.subject.trim().length < 3 || req.body.subject.trim().length > 200) {
    errors.push({ field: 'subject', message: 'Subject must be between 3 and 200 characters' });
  }
  
  // WHY: Validate message field
  if (!req.body.message || !req.body.message.trim()) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (req.body.message.trim().length < 5 || req.body.message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must be at least 5 characters' });
  }
  
  // WHY: Return errors if validation failed
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }
  
  // WHY: Sanitize inputs to prevent XSS (trim and escape HTML)
  req.body.name = escapeHtml(req.body.name.trim());
  req.body.email = req.body.email.trim().toLowerCase();
  req.body.subject = escapeHtml(req.body.subject.trim());
  req.body.message = escapeHtml(req.body.message.trim());
  
  next();
};

// WHY: Middleware to check validation results and return errors (for express-validator)
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    // WHY: Format errors for client-friendly response
    const formattedErrors = errors.array().map(err => ({
      field: err.param,
      message: err.msg
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  }
  
  next();
};

// WHY: Sanitize input to prevent XSS and injection attacks
const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    // WHY: Remove potentially dangerous characters and scripts
    return escapeHtml(input.trim());
  }
  return input;
};

// WHY: Middleware to sanitize all request body fields
const sanitizeBody = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      req.body[key] = sanitizeInput(req.body[key]);
    });
  }
  next();
};

module.exports = {
  validateApplication,
  handleValidationErrors,
  sanitizeInput,
  sanitizeBody
};
