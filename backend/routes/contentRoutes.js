const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');
const { verifyApiKey } = require('../middleware/authMiddleware');

// WHY: Public route to fetch content - no authentication required
// This allows the landing page to load content without restrictions
router.get('/', getContent);

// WHY: Protected route to update content - requires API key authentication
// This ensures only authorized administrators can modify website content
router.put('/', verifyApiKey, updateContent);

module.exports = router;
