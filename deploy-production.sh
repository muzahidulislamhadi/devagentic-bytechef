#!/bin/bash

# DevAgentic Production Deployment Script
# Usage: ./deploy-production.sh

set -e  # Exit on any error

echo "🚀 Starting DevAgentic Production Deployment..."

# Check if running as root for port 80
if [ "$EUID" -ne 0 ]; then
    echo "❌ Error: This script must be run as root to bind to port 80"
    echo "   Please run: sudo ./deploy-production.sh"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Error: Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file if it doesn't exist
ENV_FILE=".env.prod"
if [ ! -f "$ENV_FILE" ]; then
    echo "📝 Creating production environment file..."
    cat > $ENV_FILE << EOL
# DevAgentic Production Environment Variables
POSTGRES_PASSWORD=bytechef_secure_$(openssl rand -hex 16)
POSTGRES_USER=bytechef
POSTGRES_DB=bytechef
BYTECHEF_REMEMBER_ME_KEY=$(openssl rand -hex 32)
BYTECHEF_FEATURE_FLAGS=ff-520:true
EOL
    echo "✅ Created $ENV_FILE with secure random passwords"
else
    echo "✅ Using existing $ENV_FILE"
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml --env-file $ENV_FILE down 2>/dev/null || true

# Pull latest changes if this is a git repository
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes from git..."
    git pull origin main || echo "⚠️  Warning: Could not pull latest changes"
fi

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose -f docker-compose.prod.yml --env-file $ENV_FILE up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service health..."
if docker-compose -f docker-compose.prod.yml --env-file $ENV_FILE ps | grep -q "Up"; then
    echo "✅ Services are running successfully!"

    # Get server IP
    SERVER_IP=$(hostname -I | awk '{print $1}')

    echo ""
    echo "🎉 DevAgentic is now deployed and accessible at:"
    echo "   🌐 http://$SERVER_IP"
    echo "   🌐 http://localhost (if accessing locally)"
    echo ""
    echo "📊 To check logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "🛑 To stop: docker-compose -f docker-compose.prod.yml down"
    echo ""
    echo "🔒 Environment variables are stored in: $ENV_FILE"
    echo "   Keep this file secure and back it up!"

else
    echo "❌ Error: Services failed to start properly"
    echo "📋 Check logs with: docker-compose -f docker-compose.prod.yml logs"
    exit 1
fi

echo ""
echo "✨ Production deployment completed successfully!"
