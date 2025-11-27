// Load environment variables first - WHY: Configuration must be available before any other imports
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// WHY: Initialize Express application to handle HTTP requests
const app = express();

// WHY: Get port from environment or use default 5000
const PORT = process.env.PORT || 5000;

// Middleware Configuration
// WHY: Enable CORS to allow frontend requests from different origin
app.use(cors());

// WHY: Parse incoming JSON payloads in request body
app.use(express.json());

// WHY: Parse URL-encoded data from forms
app.use(express.urlencoded({ extended: true }));

// WHY: Log HTTP requests for debugging and monitoring
app.use(morgan('dev'));

// WHY: Serve uploaded files statically so they can be accessed via URL
app.use('/uploads', express.static('uploads'));

// Health Check Endpoint
// WHY: Provides a simple endpoint to verify server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// MongoDB Connection Function
// WHY: Separate function to handle database connection with proper error handling
const connectDB = async () => {
  try {
    // WHY: Connect to MongoDB using URI from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    
    // WHY: Start server only after successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    });
    
  } catch (error) {
    // WHY: Log error details for debugging
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // WHY: Exit process with failure code to prevent server from running without database
    process.exit(1);
  }
};

// WHY: Handle MongoDB connection events for monitoring
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB Disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB Error:', err);
});

// Import Routes
const contentRoutes = require('./routes/contentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Mount Routes
// WHY: Mount content routes at /api/content for website content management
app.use('/api/content', contentRoutes);

// WHY: Mount job routes at /api/jobs for job listings
app.use('/api/jobs', jobRoutes);

// WHY: Mount application routes at /api/applications for job applications
app.use('/api/applications', applicationRoutes);

// Import Error Handlers
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');

// 404 Handler - must come before error handler
// WHY: Handle requests to undefined routes
app.use(notFoundHandler);

// Global Error Handler - must be last
// WHY: Catch any unhandled errors and send proper response
app.use(errorHandler);

// WHY: Initialize database connection and start server
connectDB();

// WHY: Export app for testing purposes
module.exports = app;
