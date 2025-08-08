#!/bin/bash

echo "Personal Task Manager - Setup and Test Script"
echo "=============================================="

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if mongosh --eval "db.runCommand('ping').ok" > /dev/null 2>&1; then
    echo "✓ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Please start MongoDB service."
    echo "   For local MongoDB: mongod"
    echo "   Or update MONGODB_URI in backend/.env to use MongoDB Atlas"
fi

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node --version)
echo "✓ Node.js version: $node_version"

# Check npm version
echo "Checking npm version..."
npm_version=$(npm --version)
echo "✓ npm version: $npm_version"

# Test backend dependencies
echo "Testing backend dependencies..."
cd backend
if npm list > /dev/null 2>&1; then
    echo "✓ Backend dependencies are installed"
else
    echo "⚠️  Backend dependencies missing. Run: npm install"
fi

# Test frontend dependencies
echo "Testing frontend dependencies..."
cd ../frontend
if npm list > /dev/null 2>&1; then
    echo "✓ Frontend dependencies are installed"
else
    echo "⚠️  Frontend dependencies missing. Run: npm install"
fi

echo ""
echo "Setup Instructions:"
echo "1. Start MongoDB service"
echo "2. In backend directory: npm run dev"
echo "3. In frontend directory: npm start"
echo "4. Open browser to http://localhost:3000"
echo ""
echo "Features to test:"
echo "- User registration and login"
echo "- Create, edit, and delete tasks"
echo "- Mark tasks as completed"
echo "- Filter tasks by status"
echo "- Responsive design on different screen sizes"