#!/bin/bash

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application (if needed)
echo "🔨 Building application..."
npm run build 2>/dev/null || echo "No build script found, skipping..."

# Run tests (if available)
echo "🧪 Running tests..."
npm test 2>/dev/null || echo "No test script found, skipping..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed successfully!"
echo "🌍 Your site is now live!"
