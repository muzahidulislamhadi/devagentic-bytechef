#!/bin/bash

echo "🔍 DevAgentic Deployment Pre-Check"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found. Please run this script from the project root directory."
    exit 1
fi

echo "✅ Found docker-compose.yml"

# Check if client directory exists
if [ ! -d "client" ]; then
    echo "❌ Error: client directory not found."
    exit 1
fi

echo "✅ Found client directory"

# Check if package.json exists in client
if [ ! -f "client/package.json" ]; then
    echo "❌ Error: client/package.json not found."
    exit 1
fi

echo "✅ Found client/package.json"

# Check if favicon.ico exists in client/public
if [ ! -f "client/public/favicon.ico" ]; then
    echo "❌ Error: client/public/favicon.ico not found."
    exit 1
fi

echo "✅ Found client/public/favicon.ico"

# Check if Dockerfile exists
if [ ! -f "Dockerfile" ]; then
    echo "❌ Error: Dockerfile not found."
    exit 1
fi

echo "✅ Found Dockerfile"

# Check if Node.js is available for building
if ! command -v node &> /dev/null; then
    echo "⚠️  Warning: Node.js not found. The Docker build will handle this, but local testing won't work."
else
    echo "✅ Node.js found: $(node --version)"
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "⚠️  Warning: npm not found. The Docker build will handle this, but local testing won't work."
else
    echo "✅ npm found: $(npm --version)"
fi

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker not found. Please install Docker to proceed with deployment."
    exit 1
fi

echo "✅ Docker found: $(docker --version)"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Warning: docker-compose not found. Trying 'docker compose' instead..."
    if ! docker compose version &> /dev/null; then
        echo "❌ Error: Neither 'docker-compose' nor 'docker compose' found."
        exit 1
    else
        echo "✅ docker compose found: $(docker compose version)"
    fi
else
    echo "✅ docker-compose found: $(docker-compose --version)"
fi

echo ""
echo "🎉 All pre-checks passed! You can now run:"
echo "   docker compose up --build"
echo ""
echo "📋 Expected ports:"
echo "   - 8080: Main application"
echo "   - 5432: PostgreSQL database"
echo ""
echo "🌐 Access URLs after startup:"
echo "   - http://localhost:8080 (main app)"
echo "   - https://dashboard.devagentic.io (if domain is configured)"
