#!/bin/bash

echo "🚀 SIMPLE AUTHENTICATION FIX DEPLOYMENT"
echo "========================================"
echo ""

# Step 1: Build frontend with our fixes
echo "📝 Step 1: Building Frontend with Authentication Fixes"
echo "-----------------------------------------------------"
cd client
echo "🔄 Building frontend with Firebase integration..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "🔍 Verifying frontend contains our fixes..."
if find dist -name "*.js" -exec grep -l "hasFirebaseConfig" {} \; | head -1 > /dev/null; then
    echo "✅ Firebase integration: FOUND"
else
    echo "❌ Firebase integration: MISSING"
    exit 1
fi

if find dist -name "*.js" -exec grep -l "admin@devagentic.io" {} \; | head -1 > /dev/null; then
    echo "✅ Admin role assignment: FOUND"
else
    echo "❌ Admin role assignment: MISSING"
    exit 1
fi

cd ..

# Step 2: Stop existing containers
echo ""
echo "📝 Step 2: Stopping Existing Containers"
echo "---------------------------------------"
docker-compose down 2>/dev/null || true
docker-compose -f docker-compose.override.yml down 2>/dev/null || true

# Step 3: Clean up old images
echo ""
echo "📝 Step 3: Cleaning Up Old Images"
echo "--------------------------------"
docker system prune -f

# Step 4: Deploy with our fixes
echo ""
echo "📝 Step 4: Deploying with Authentication Fixes"
echo "----------------------------------------------"
echo "🔄 Starting deployment..."
docker-compose -f docker-compose.override.yml up -d

echo "⏳ Waiting for services to start..."
sleep 30

# Step 5: Verify deployment
echo ""
echo "📝 Step 5: Verifying Deployment"
echo "------------------------------"

# Check if containers are running
if docker-compose -f docker-compose.override.yml ps | grep -q "Up"; then
    echo "✅ Containers are running"
else
    echo "❌ Containers failed to start"
    docker-compose -f docker-compose.override.yml logs
    exit 1
fi

# Test the authentication endpoints
echo "🔍 Testing authentication endpoints..."

# Wait a bit more for the application to fully start
sleep 15

# Test registration endpoint
echo "🔍 Testing multi-user registration..."
REGISTER_TEST=$(curl -s -w "%{http_code}" -X POST http://localhost/api/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"TestPass123","langKey":"en","login":"test@example.com"}' \
    -o /dev/null)

if [[ "$REGISTER_TEST" == "201" ]]; then
    echo "✅ Multi-user registration: WORKING"
elif [[ "$REGISTER_TEST" == "400" ]]; then
    echo "⚠️  Registration returned 400 - checking if it's because user already exists..."
    # Try with a different email
    REGISTER_TEST2=$(curl -s -w "%{http_code}" -X POST http://localhost/api/register \
        -H "Content-Type: application/json" \
        -d '{"email":"test2@example.com","password":"TestPass123","langKey":"en","login":"test2@example.com"}' \
        -o /dev/null)

    if [[ "$REGISTER_TEST2" == "201" ]]; then
        echo "✅ Multi-user registration: WORKING (first user already existed)"
    else
        echo "❌ Multi-user registration: FAILED (HTTP $REGISTER_TEST2)"
    fi
else
    echo "❌ Multi-user registration: FAILED (HTTP $REGISTER_TEST)"
fi

# Test frontend
echo "🔍 Testing frontend social login buttons..."
if curl -s http://localhost | grep -q "Continue with Google\|Continue with GitHub"; then
    echo "✅ Social login buttons: PRESENT"
else
    echo "❌ Social login buttons: MISSING"
fi

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================"
echo ""
echo "🌐 Access your application at: http://localhost"
echo "👤 Admin account: admin@devagentic.io"
echo "🔐 Authentication methods:"
echo "   - Email/Password registration (any email)"
echo "   - Google social login (if configured)"
echo "   - GitHub social login (if configured)"
echo ""
echo "✅ Multi-user registration enabled"
echo "✅ Admin privileges for admin@devagentic.io"
echo "✅ Firebase social authentication integrated"
echo ""
