#!/bin/bash

echo "🚀 Setting up SportSphere Universal - Cross-Platform Sports App"
echo "================================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please update .env file with your Supabase credentials"
else
    echo "✅ .env file already exists"
fi

# Build packages
echo "🔨 Building shared packages..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env file with your Supabase credentials"
echo "2. Run 'npm run dev' to start development"
echo "3. Run 'npm run dev:mobile' for mobile development"
echo "4. Run 'npm run dev:web' for web development"
echo ""
echo "📚 Check README.md for detailed documentation"
echo ""
