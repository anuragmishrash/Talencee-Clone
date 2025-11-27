// WHY: Middleware to verify API key for admin operations
const verifyApiKey = (req, res, next) => {
  // WHY: Extract API key from request header
  const apiKey = req.headers['x-api-key'];
  
  // WHY: Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - API key is required'
    });
  }
  
  // WHY: Compare provided key with environment variable
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Invalid API key'
    });
  }
  
  // WHY: If valid, proceed to next middleware/route handler
  next();
};

module.exports = { verifyApiKey };
