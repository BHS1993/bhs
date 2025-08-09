# Authentication System Documentation

## Overview

The school management system now includes a comprehensive authentication system that prevents unauthorized access to the admin dashboard and other protected areas.

## Features

### 🔐 Secure Authentication
- JWT-based token authentication
- Password hashing with bcrypt
- Token refresh mechanism
- Session management
- Role-based access control

### 🛡️ Security Features
- Rate limiting on authentication endpoints
- Input validation and sanitization
- Secure password requirements
- Account lockout protection
- CSRF protection

### 👥 User Roles
- **Admin**: Full system access
- **Teacher**: Teacher-specific features
- **Student**: Student dashboard access
- **Parent**: Parent portal access

## Setup Instructions

### 1. Database Setup
```bash
# Install MySQL if not already installed
# Create database
mysql -u root -p
CREATE DATABASE bhatia_school;
```

### 2. Environment Configuration
```bash
# Copy test environment file
cp test.env .env

# Edit .env file with your database credentials
nano .env
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed Demo Users
```bash
npm run seed
```

### 5. Start Server
```bash
npm run dev
```

## Demo Login Credentials

After running the seeder, you can use these credentials:

### Admin Users
- **Username**: `admin` | **Password**: `admin123`
- **Username**: `headmaster` | **Password**: `head123`

### Teacher Users
- **Username**: `teacher1` | **Password**: `teach123`
- **Username**: `teacher2` | **Password**: `teach123`
- **Username**: `teacher3` | **Password**: `teach123`

### Student Users
- **Username**: `student1` | **Password**: `stud123`
- **Username**: `student2` | **Password**: `stud123`
- **Username**: `student3` | **Password**: `stud123`

### Parent Users
- **Username**: `parent1` | **Password**: `parent123`
- **Username**: `parent2` | **Password**: `parent123`

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/login`
Login with username/email and password.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123",
  "userType": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@bhatiaschool.com",
      "role": "admin",
      "fullName": "প্রধান প্রশাসক"
    },
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

#### POST `/api/auth/logout`
Logout and invalidate tokens.

#### GET `/api/auth/me`
Get current user information.

#### POST `/api/auth/refresh`
Refresh access token using refresh token.

## Frontend Integration

### Login Page
The login page (`login.html`) now integrates with the backend API:

1. **User Type Selection**: Choose between Admin, Teacher, Student, or Parent
2. **API Integration**: Calls `/api/auth/login` endpoint
3. **Token Storage**: Saves JWT tokens in localStorage/sessionStorage
4. **Automatic Redirect**: Redirects to appropriate dashboard based on role

### Admin Dashboard Protection
The admin dashboard (`admin/index.html`) includes:

1. **Authentication Check**: Validates JWT token on page load
2. **Token Refresh**: Automatically refreshes tokens every 10 minutes
3. **Logout Functionality**: Clears tokens and redirects to login
4. **User Info Display**: Shows current user information

## Security Considerations

### Token Management
- Access tokens expire in 24 hours
- Refresh tokens expire in 7 days
- Tokens are stored securely in browser storage
- Automatic token refresh prevents session expiration

### Password Security
- Passwords are hashed using bcrypt with 12 rounds
- Minimum password length: 6 characters
- Password validation on both frontend and backend

### Rate Limiting
- Authentication endpoints are rate-limited
- Prevents brute force attacks
- Configurable limits in middleware

## Error Handling

### Common Error Responses

#### Invalid Credentials
```json
{
  "success": false,
  "message": "Invalid credentials",
  "error": "INVALID_CREDENTIALS"
}
```

#### Account Deactivated
```json
{
  "success": false,
  "message": "Account is deactivated",
  "error": "ACCOUNT_DEACTIVATED"
}
```

#### Token Expired
```json
{
  "success": false,
  "message": "Token expired",
  "error": "TOKEN_EXPIRED"
}
```

## Development Notes

### Testing
- Use the demo credentials for testing
- All endpoints are tested with the seeded data
- Frontend automatically handles API responses

### Customization
- Modify user roles in `models/User.js`
- Update authentication logic in `middleware/auth.js`
- Customize login validation in `routes/auth.js`

### Deployment
- Change JWT secrets in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Configure proper CORS settings

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL service is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **JWT Token Errors**
   - Check JWT_SECRET is set in environment
   - Verify token expiration settings
   - Clear browser storage if needed

3. **CORS Errors**
   - Check CORS_ORIGIN setting
   - Verify API_BASE_URL configuration
   - Ensure frontend and backend ports match

### Debug Mode
Enable debug mode by setting `DEBUG=true` in `.env` for detailed logging.

## Support

For issues or questions about the authentication system:
- Check the console for error messages
- Verify all environment variables are set
- Ensure database is properly configured
- Test with demo credentials first
