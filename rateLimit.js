const rateLimit = require('express-rate-limit');

// General rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP, please try again later.',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Strict rate limiter for authentication endpoints
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.',
    error: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many authentication attempts, please try again later.',
      error: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// API rate limiter
const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  message: {
    success: false,
    message: 'API rate limit exceeded, please try again later.',
    error: 'API_RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'API rate limit exceeded, please try again later.',
      error: 'API_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// File upload rate limiter
const uploadRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 upload requests per windowMs
  message: {
    success: false,
    message: 'Too many file upload attempts, please try again later.',
    error: 'UPLOAD_RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many file upload attempts, please try again later.',
      error: 'UPLOAD_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// SMS rate limiter
const smsRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 SMS requests per windowMs
  message: {
    success: false,
    message: 'Too many SMS requests, please try again later.',
    error: 'SMS_RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many SMS requests, please try again later.',
      error: 'SMS_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

module.exports = {
  rateLimiter,
  authRateLimiter,
  apiRateLimiter,
  uploadRateLimiter,
  smsRateLimiter
};
