// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message: `Validation Error: ${message}`,
      statusCode: 400,
      error: 'VALIDATION_ERROR'
    };
  }

  // Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message: `Duplicate Entry: ${message}`,
      statusCode: 400,
      error: 'DUPLICATE_ENTRY'
    };
  }

  // Sequelize foreign key constraint errors
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = {
      message: 'Referenced record does not exist',
      statusCode: 400,
      error: 'FOREIGN_KEY_CONSTRAINT'
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Invalid token',
      statusCode: 401,
      error: 'INVALID_TOKEN'
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expired',
      statusCode: 401,
      error: 'TOKEN_EXPIRED'
    };
  }

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = {
      message: 'File too large',
      statusCode: 400,
      error: 'FILE_TOO_LARGE'
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = {
      message: 'Unexpected file field',
      statusCode: 400,
      error: 'UNEXPECTED_FILE'
    };
  }

  // Cast errors (MongoDB)
  if (err.name === 'CastError') {
    error = {
      message: 'Invalid ID format',
      statusCode: 400,
      error: 'INVALID_ID'
    };
  }

  // Duplicate key errors (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = {
      message: `Duplicate value for ${field}`,
      statusCode: 400,
      error: 'DUPLICATE_KEY'
    };
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: error.error || 'INTERNAL_SERVER_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Async error wrapper
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode, errorType = 'CUSTOM_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error
class ValidationError extends AppError {
  constructor(message) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

// Authentication error
class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

// Authorization error
class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

// Not found error
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

// Conflict error
class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

module.exports = {
  errorHandler,
  asyncHandler,
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError
};
