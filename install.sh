#!/bin/bash

# Talencee MERN Clone - Automated Installation Script
# This script installs all dependencies and sets up the project

echo "🚀 TALENCEE.COM MERN CLONE - AUTOMATED SETUP"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ NPM version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed successfully"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed successfully"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo ""

# Seed database
echo "🌱 Seeding database with initial data..."
cd backend
npm run seed
if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
else
    echo "⚠️  Database seeding failed. You may need to configure MongoDB connection."
fi
cd ..
echo ""

echo "=============================================="
echo "🎉 INSTALLATION COMPLETE!"
echo "=============================================="
echo ""
echo "⚠️  IMPORTANT: Configure SMTP settings in backend/.env"
echo "   - SMTP_USER=your-email@gmail.com"
echo "   - SMTP_PASS=your-gmail-app-password"
echo "   - HR_EMAIL=hr@company.com"
echo ""
echo "🚀 TO START THE APPLICATION:"
echo ""
echo "   Terminal 1 - Backend:"
echo "   $ cd backend && npm run dev"
echo ""
echo "   Terminal 2 - Frontend:"
echo "   $ cd frontend && npm run dev"
echo ""
echo "📍 Access the application:"
echo "   - Landing Page: http://localhost:3000"
echo "   - Admin Panel: http://localhost:3000/admin"
echo "   - API Key: talencee-admin-2024-secure-key"
echo ""
echo "📚 For more information, see:"
echo "   - README.md"
echo "   - SETUP_GUIDE.md"
echo "   - FINAL_DELIVERY_SUMMARY.md"
echo ""
echo "✨ Enjoy your amazing MERN application!"
