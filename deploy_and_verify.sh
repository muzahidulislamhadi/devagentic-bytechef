#!/bin/bash
# Complete Deployment and Verification Script

echo "🚀 COMPLETE BYTECHEF DEPLOYMENT WITH VERIFICATION"
echo "================================================="

# Step 1: Verify fixes are in local code
echo "📝 Step 1: Verifying Local Code Has Fixes"
if ! ./verify_backend_fixes.sh > /dev/null 2>&1; then
    echo "❌ Local backend fixes are missing - cannot deploy"
    exit 1
fi

if ! ./verify_frontend_fixes.sh > /dev/null 2>&1; then
    echo "❌ Local frontend fixes are missing - cannot deploy"
    exit 1
fi

echo "✅ Local code verification passed"
echo ""

# Step 2: Generate deployment fingerprint
echo "📝 Step 2: Generating Deployment Fingerprint"
./generate_checksums.sh > /dev/null
FINGERPRINT=$(sha256sum auth_files.sha256 | cut -d' ' -f1 | head -c 8)
echo "✅ Deployment fingerprint: $FINGERPRINT"
echo ""

# Step 3: Docker build with verification
echo "📝 Step 3: Building Docker Images"
echo "🔄 Stopping existing containers..."
docker-compose down 2>/dev/null || true

echo "🔄 Building frontend with our fixes..."
docker-compose build client --no-cache

echo "🔄 Building backend with our fixes..."
docker-compose build server --no-cache

echo "✅ Docker build completed"
echo ""

# Step 4: Deploy and wait for startup
echo "📝 Step 4: Deploying Application"
docker-compose up -d

echo "⏳ Waiting for application to start..."
sleep 45

# Step 5: Verify deployment
echo "📝 Step 5: Verifying Deployment"

# Check if containers are running
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Containers failed to start"
    docker-compose logs
    exit 1
fi

echo "✅ Containers are running"

# Test the actual deployment
echo "🔄 Testing live deployment..."
if ./verify_runtime_api.sh > /dev/null 2>&1; then
    echo "✅ Runtime verification passed"
else
    echo "❌ Runtime verification failed"
    echo "📋 Check logs:"
    docker-compose logs --tail=20
    exit 1
fi

echo ""

# Step 6: Frontend verification
echo "📝 Step 6: Frontend Deployment Verification"

# Wait a bit more for frontend
sleep 15

# Check if frontend serves our fixed code
echo "🔄 Checking if frontend has our fixes..."
FRONTEND_TEST=$(curl -s http://localhost:3000 2>/dev/null || curl -s http://localhost:8080 2>/dev/null || echo "")

if echo "$FRONTEND_TEST" | grep -q "hasFirebaseConfig"; then
    echo "✅ Frontend deployment has our fixes"
else
    echo "❌ Frontend deployment does not have our fixes"
    echo "🔍 Checking available endpoints..."
    curl -s http://localhost:3000 > test_frontend.html 2>/dev/null || curl -s http://localhost:8080 > test_frontend.html 2>/dev/null || echo "No frontend accessible"
    
    if [ -f test_frontend.html ]; then
        echo "📝 Frontend content size: $(wc -c < test_frontend.html) bytes"
        if grep -q "login\|register" test_frontend.html; then
            echo "📝 Frontend has login/register content"
        else
            echo "❌ Frontend missing login/register content"
        fi
        rm test_frontend.html
    fi
fi

echo ""

# Step 7: Complete verification
echo "📝 Step 7: Complete System Verification"
if ./master_verification.sh > /dev/null 2>&1; then
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "✅ All authentication fixes are deployed and working"
    echo "✅ Multi-user registration: WORKING"
    echo "✅ Admin role assignment: WORKING"  
    echo "✅ Social login integration: READY"
    echo ""
    echo "🌐 Access your application at: http://localhost:8080"
    echo "📋 Deployment fingerprint: $FINGERPRINT"
else
    echo "💥 DEPLOYMENT VERIFICATION FAILED"
    echo "❌ Something is wrong with the deployment"
    echo ""
    echo "🔍 Diagnostic Information:"
    docker-compose ps
    echo ""
    echo "📋 Recent logs:"
    docker-compose logs --tail=10
    exit 1
fi

echo ""
echo "🎯 NEXT STEPS:"
echo "1. Test multi-user registration at http://localhost:8080/register"
echo "2. Verify admin@devagentic.io gets admin role"
echo "3. Test social login if Firebase is configured"
echo "4. Deploy to production with same Docker images"
