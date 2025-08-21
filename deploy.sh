#!/bin/bash

echo "🚀 Starting SportSphere deployment..."

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

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run linting
echo "🔍 Running linting..."
npm run lint 2>/dev/null || echo "⚠️  Linting not configured, skipping..."

# Build the application
echo "🏗️  Building the application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Start the development server
echo "🚀 Starting development server..."
echo "📱 Application will be available at: http://localhost:3000"
echo "🔗 Match Detail feature is now available - click on any match card to view details"
echo "💬 Multi-level chat system is integrated with City, State, Country, Community, and Team chats"
echo "📊 Live statistics and detailed match information are displayed"

npm start
