# School Management System

A comprehensive school management system built with Node.js, Express, and MongoDB.

## 🚀 Quick Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Add Custom Domain:**
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Domains
   - Add your domain

### Option 2: Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify login
   netlify deploy
   ```

### Option 3: Manual Deployment

1. **Clone repository:**
   ```bash
   git clone <your-repo-url>
   cd school-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start server:**
   ```bash
   npm start
   ```

## 🌐 Domain Configuration

### DNS Settings

**For Vercel:**
```
A Record: 76.76.19.19
CNAME: cname.vercel-dns.com
```

**For Netlify:**
```
A Record: 75.2.60.5
CNAME: yoursite.netlify.app
```

### SSL Certificate

Vercel and Netlify provide automatic SSL certificates.

## 📁 Project Structure

```
├── assets/          # Static assets (CSS, JS, images)
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── public/          # Public static files
└── server.js        # Main server file
```

## 🔧 Environment Variables

Create a `.env` file:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/school_db

# Server
PORT=3000
NODE_ENV=production

# JWT
JWT_SECRET=your_secret_key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

## 📊 API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/login` - User login
- `GET /api/admin/*` - Admin routes
- `GET /api/student/*` - Student routes
- `GET /api/teacher/*` - Teacher routes
- `GET /api/parent/*` - Parent routes

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, email support@yourschool.com or create an issue in this repository.
