// WHY: Global error handling middleware to catch and format all errors
const errorHandler = (err, req, res, next) => {
  // WHY: Log error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  
  // WHY: Determine status code (use error's status or default to 500)
  const statusCode = err.statusCode || err.status || 500;
  
  // WHY: Send formatted error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // WHY: Include stack trace only in development for debugging
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// WHY: Handle 404 errors for undefined routes
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
