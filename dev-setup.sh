#!/bin/bash

# DevAgentic Development Setup Script
echo "🚀 DevAgentic Development Setup"
echo "==============================="

# Function to check if command exists
check_command() {
    if command -v "$1" >/dev/null 2>&1; then
        echo "✅ $1 is installed"
        return 0
    else
        echo "❌ $1 is not installed"
        return 1
    fi
}

# Function to check if service is running
check_service() {
    if lsof -i:$1 >/dev/null 2>&1; then
        echo "✅ Service running on port $1"
        return 0
    else
        echo "❌ No service running on port $1"
        return 1
    fi
}

echo ""
echo "📋 Checking Prerequisites..."
echo "-----------------------------"

# Check Node.js
if check_command "node"; then
    NODE_VERSION=$(node --version)
    echo "   Node.js version: $NODE_VERSION"
else
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
check_command "npm" || { echo "   npm should come with Node.js"; exit 1; }

# Check Java
JAVA_MISSING=false
if check_command "java"; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "   Java version: $JAVA_VERSION"
else
    echo "   Please install Java 17+ from https://adoptium.net/"
    JAVA_MISSING=true
fi

# Check PostgreSQL
POSTGRES_MISSING=false
if check_command "psql"; then
    POSTGRES_VERSION=$(psql --version)
    echo "   PostgreSQL version: $POSTGRES_VERSION"
else
    echo "   Please install PostgreSQL from https://www.postgresql.org/download/"
    POSTGRES_MISSING=true
fi

echo ""
echo "🔍 Checking Services..."
echo "----------------------"

# Check if PostgreSQL is running
if check_service "5432"; then
    echo "   PostgreSQL appears to be running"
else
    echo "   PostgreSQL is not running on port 5432"
    echo "   You may need to start PostgreSQL service"
fi

echo ""
echo "📝 Available Commands:"
echo "====================="
echo ""

if [ "$JAVA_MISSING" = false ] && [ "$POSTGRES_MISSING" = false ]; then
    echo "🎉 All prerequisites are installed!"
    echo ""
    echo "To run both frontend and backend:"
    echo "   cd client && npm run start"
    echo ""
    echo "To run only frontend (for development):"
    echo "   cd client && npm run dev:frontend"
    echo ""
    echo "To run only backend:"
    echo "   cd client && npm run dev:backend"
    echo ""
    echo "Frontend will be available at: http://localhost:5173"
    echo "Backend API will be available at: http://localhost:8080"
else
    echo "⚠️  Some prerequisites are missing."
    echo ""
    echo "For now, you can run the frontend only:"
    echo "   cd client && npm run dev:frontend"
    echo ""
    echo "Frontend will be available at: http://localhost:5173"
    echo ""
    if [ "$JAVA_MISSING" = true ]; then
        echo "To install Java on macOS:"
        echo "   brew install openjdk@17"
        echo "   Or download from: https://adoptium.net/"
    fi
    if [ "$POSTGRES_MISSING" = true ]; then
        echo "To install PostgreSQL on macOS:"
        echo "   brew install postgresql@16"
        echo "   brew services start postgresql@16"
    fi
fi

echo ""
echo "🔧 Database Setup (when PostgreSQL is available):"
echo "================================================"
echo "1. Create database:"
echo "   createdb bytechef"
echo ""
echo "2. Set environment variables:"
echo "   export BYTECHEF_DATASOURCE_URL=jdbc:postgresql://localhost:5432/bytechef"
echo "   export BYTECHEF_DATASOURCE_USERNAME=your_username"
echo "   export BYTECHEF_DATASOURCE_PASSWORD=your_password"
