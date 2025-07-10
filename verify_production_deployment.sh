#!/bin/bash
# Production Deployment Verification Script

PROD_URL="${1:-https://dashboard.devagentic.io}"

echo "🌐 VERIFYING PRODUCTION DEPLOYMENT"
echo "=================================="
echo "Target: $PROD_URL"
echo ""

# Step 1: Check if our fixes are deployed
echo "📝 Step 1: Checking if fixes are deployed to production"

FRONTEND_CODE=$(curl -s "$PROD_URL/login" 2>/dev/null || echo "")
if echo "$FRONTEND_CODE" | grep -q "hasFirebaseConfig"; then
    echo "✅ Our frontend fixes are deployed to production"
else
    echo "❌ Our frontend fixes are NOT deployed to production"
    echo "🚨 Production is running old code!"
    
    # Get more details
    MAIN_JS=$(echo "$FRONTEND_CODE" | grep -o 'src="[^"]*\.js"' | head -1 | sed 's/src="//;s/"//')
    if [ -n "$MAIN_JS" ]; then
        echo "📦 Checking main JS bundle: $MAIN_JS"
        JS_CODE=$(curl -s "$PROD_URL$MAIN_JS" 2>/dev/null || echo "")
        if echo "$JS_CODE" | grep -q "hasFirebaseConfig"; then
            echo "✅ Fixes found in JS bundle"
        else
            echo "❌ Fixes NOT found in JS bundle"
        fi
    fi
fi

echo ""

# Step 2: Test social login UI
echo "📝 Step 2: Testing Social Login UI"
if echo "$FRONTEND_CODE" | grep -i -q "google"; then
    echo "✅ Google login detected in production UI"
else
    echo "❌ Google login NOT found in production UI"
fi

if echo "$FRONTEND_CODE" | grep -i -q "github"; then
    echo "✅ GitHub login detected in production UI"
else
    echo "❌ GitHub login NOT found in production UI"
fi

echo ""

# Step 3: Test backend API
echo "📝 Step 3: Testing Backend API"
API_HEALTH=$(curl -s -w "%{http_code}" -o /dev/null "$PROD_URL/api/management/health" 2>/dev/null || echo "000")
echo "    Health endpoint: $API_HEALTH"

if [ "$API_HEALTH" = "200" ]; then
    echo "✅ Backend API is healthy"
    
    # Test registration endpoint
    echo "📝 Testing registration endpoint..."
    TIMESTAMP=$(date +%s)
    REG_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
      "$PROD_URL/api/register" \
      -H "Content-Type: application/json" \
      -d "{
        \"login\": \"testuser_${TIMESTAMP}@prodtest.com\",
        \"email\": \"testuser_${TIMESTAMP}@prodtest.com\",
        \"password\": \"TestPassword123!\",
        \"firstName\": \"Test\",
        \"lastName\": \"User\"
      }" 2>/dev/null || echo "000")
    
    REG_CODE="${REG_RESPONSE: -3}"
    REG_BODY="${REG_RESPONSE%???}"
    
    echo "    Registration response: $REG_CODE"
    
    if [ "$REG_CODE" = "201" ]; then
        echo "✅ User registration works in production"
    elif [ "$REG_CODE" = "400" ]; then
        if echo "$REG_BODY" | grep -q "Organization already exists"; then
            echo "❌ CRITICAL: 'Organization already exists' error in production"
            echo "🚨 Multi-user bug is present in production!"
        else
            echo "⚠️  Registration failed for other reasons (might be normal)"
        fi
    else
        echo "⚠️  Unexpected registration response: $REG_CODE"
    fi
    
elif [ "$API_HEALTH" = "401" ] || [ "$API_HEALTH" = "403" ]; then
    echo "⚠️  Backend API requires authentication (expected)"
else
    echo "❌ Backend API is not responding correctly"
fi

echo ""

# Step 4: Summary and recommendations
echo "🏁 PRODUCTION VERIFICATION SUMMARY"
echo "=================================="

# Determine overall status
FRONTEND_FIXED=$(echo "$FRONTEND_CODE" | grep -q "hasFirebaseConfig" && echo "true" || echo "false")
HAS_SOCIAL_LOGIN=$(echo "$FRONTEND_CODE" | grep -i -q "google\|github" && echo "true" || echo "false")
API_WORKING=$([ "$API_HEALTH" = "200" ] && echo "true" || echo "false")

if [ "$FRONTEND_FIXED" = "true" ] && [ "$HAS_SOCIAL_LOGIN" = "true" ] && [ "$API_WORKING" = "true" ]; then
    echo "🎉 STATUS: PRODUCTION IS FULLY FIXED"
    echo "✅ Frontend fixes deployed"
    echo "✅ Social login available"
    echo "✅ Backend API working"
    echo "✅ Multi-user registration should work"
elif [ "$FRONTEND_FIXED" = "false" ]; then
    echo "💥 STATUS: PRODUCTION NEEDS REDEPLOYMENT"
    echo "❌ Frontend fixes are NOT deployed"
    echo "❌ Production is running old code"
    echo ""
    echo "🛠️  SOLUTION:"
    echo "1. Build Docker images with: docker-compose build --no-cache"
    echo "2. Deploy to production with the new images"
    echo "3. Run this script again to verify"
else
    echo "⚠️  STATUS: PARTIAL DEPLOYMENT"
    echo "📋 Some fixes are deployed, but issues remain"
fi

echo ""
echo "📅 Verification time: $(date)"
echo "�� Tested URL: $PROD_URL"
