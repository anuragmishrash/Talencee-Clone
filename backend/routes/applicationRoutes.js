const express = require('express');
const router = express.Router();
const { submitApplication } = require('../controllers/applicationController');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');
const { validateApplication, handleValidationErrors } = require('../middleware/validationMiddleware');

// WHY: Public route to submit application with resume upload
// Middleware chain: upload file -> validate fields -> submit
router.post(
  '/',
  upload.single('resume'), // WHY: Handle resume file upload
  handleUploadError, // WHY: Handle multer errors
  validateApplication, // WHY: Validate form fields (includes validation check)
  submitApplication // WHY: Process and save application
);

module.exports = router;
