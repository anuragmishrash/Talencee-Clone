const multer = require('multer');
const path = require('path');
const fs = require('fs');

// WHY: Ensure uploads directory exists before attempting to save files
const uploadDir = process.env.UPLOAD_DIR || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// WHY: Configure storage to control where and how files are saved
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // WHY: Save all uploaded files to the uploads directory
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // WHY: Generate unique filename using timestamp and random string to prevent overwrites
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const nameWithoutExt = path.basename(file.originalname, ext);
    
    // WHY: Sanitize filename to remove special characters
    const sanitizedName = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '_');
    
    cb(null, sanitizedName + '-' + uniqueSuffix + ext);
  }
});

// WHY: File filter to validate file types before upload
const fileFilter = (req, file, cb) => {
  // WHY: Get file extension and convert to lowercase for case-insensitive comparison
  const ext = path.extname(file.originalname).toLowerCase();
  
  // WHY: Check MIME type as well for additional security
  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  // WHY: Accept only PDF and DOC/DOCX files as per requirements
  if ((ext === '.pdf' || ext === '.doc' || ext === '.docx') && 
      allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // WHY: Reject file with descriptive error message
    cb(new Error('Only PDF and DOC files are allowed'), false);
  }
};

// WHY: Configure multer with storage, file filter, and size limits
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    // WHY: Limit file size to 5MB as per requirements
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024 // 5MB
  }
});

// WHY: Middleware to handle multer errors with proper status codes
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // WHY: Handle Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds 5MB limit'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    // WHY: Handle custom errors from fileFilter
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  next();
};

// WHY: Export configured upload middleware and error handler
module.exports = {
  upload,
  handleUploadError
};
