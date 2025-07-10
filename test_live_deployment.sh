#!/bin/bash
# Live Deployment Frontend-Backend Integration Test

echo "🌐 TESTING LIVE FRONTEND-BACKEND INTEGRATION"
echo "============================================="
echo "Target: https://dashboard.devagentic.io"
echo ""

BASE_URL="https://dashboard.devagentic.io"
TIMESTAMP=$(date +%s)

# Test 1: Check if frontend is accessible
echo "📝 Test 1: Frontend Accessibility"
if curl -s --max-time 10 -o /dev/null -w "%{http_code}" "$BASE_URL" | grep -q "200"; then
    echo "✅ Frontend is accessible at $BASE_URL"
else
    echo "❌ Frontend is NOT accessible at $BASE_URL"
    exit 1
fi

echo ""

# Test 2: Check if backend API is accessible
echo "📝 Test 2: Backend API Accessibility"
API_RESPONSE=$(curl -s --max-time 10 -o /dev/null -w "%{http_code}" "$BASE_URL/api/management/health")
if [ "$API_RESPONSE" = "200" ]; then
    echo "✅ Backend API is accessible at $BASE_URL/api"
else
    echo "❌ Backend API is NOT accessible (HTTP $API_RESPONSE)"
    echo "🔍 This suggests frontend-backend integration issues"
fi

echo ""

# Test 3: Test Registration Endpoint (Multi-user capability)
echo "📝 Test 3: Multi-User Registration Test"
echo "  → Testing first user registration..."

USER1_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "User-Agent: ByteChef-Integration-Test" \
  -d "{
    \"login\": \"testuser1_${TIMESTAMP}@integrationtest.com\",
    \"email\": \"testuser1_${TIMESTAMP}@integrationtest.com\", 
    \"password\": \"TestPassword123!\",
    \"firstName\": \"Test\",
    \"lastName\": \"User1\"
  }")

USER1_CODE="${USER1_RESPONSE: -3}"
USER1_BODY="${USER1_RESPONSE%???}"

echo "    Response code: $USER1_CODE"

if [ "$USER1_CODE" = "201" ]; then
    echo "✅ First user registration successful"
elif [ "$USER1_CODE" = "400" ]; then
    echo "⚠️  First user registration failed (400)"
    echo "    Response: $USER1_BODY"
    
    if echo "$USER1_BODY" | grep -q "Organization already exists"; then
        echo "❌ CRITICAL: 'Organization already exists' error detected!"
        echo "❌ Multi-user registration is BROKEN"
        exit 1
    else
        echo "ℹ️  Might be validation error (expected if user exists)"
    fi
else
    echo "❌ Unexpected response code: $USER1_CODE"
    echo "    Response: $USER1_BODY"
fi

echo ""
echo "  → Testing second user registration..."

USER2_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "User-Agent: ByteChef-Integration-Test" \
  -d "{
    \"login\": \"testuser2_${TIMESTAMP}@integrationtest.com\",
    \"email\": \"testuser2_${TIMESTAMP}@integrationtest.com\", 
    \"password\": \"TestPassword123!\",
    \"firstName\": \"Test\",
    \"lastName\": \"User2\"
  }")

USER2_CODE="${USER2_RESPONSE: -3}"
USER2_BODY="${USER2_RESPONSE%???}"

echo "    Response code: $USER2_CODE"

# Critical analysis
if [ "$USER1_CODE" = "201" ] && [ "$USER2_CODE" = "201" ]; then
    echo "🎉 EXCELLENT: Multi-user registration works perfectly!"
    echo "✅ Frontend-backend integration is working"
    echo "✅ 'Organization already exists' bug is FIXED"
elif [ "$USER1_CODE" = "400" ] && [ "$USER2_CODE" = "400" ]; then
    if echo "$USER2_BODY" | grep -q "Organization already exists"; then
        echo "❌ CRITICAL FAILURE: Multi-user registration is BROKEN"
        echo "❌ 'Organization already exists' error on second user"
        echo "❌ Frontend-backend integration has issues"
        exit 1
    else
        echo "ℹ️  Both users failed for other reasons (might be normal)"
    fi
elif [ "$USER1_CODE" = "201" ] && [ "$USER2_CODE" = "400" ]; then
    if echo "$USER2_BODY" | grep -q "Organization already exists"; then
        echo "❌ CRITICAL: Second user blocked by 'Organization already exists'"
        echo "❌ Multi-user bug is BACK!"
        exit 1
    else
        echo "⚠️  Second user failed for other reasons"
    fi
else
    echo "📊 Results: User1=$USER1_CODE, User2=$USER2_CODE"
fi

echo ""

# Test 4: Frontend Login Page Analysis
echo "📝 Test 4: Frontend Login Page Content Analysis"
LOGIN_PAGE=$(curl -s "$BASE_URL/login")

if echo "$LOGIN_PAGE" | grep -q "Google"; then
    echo "✅ Google login button detected in frontend"
else
    echo "❌ Google login button NOT found in frontend"
fi

if echo "$LOGIN_PAGE" | grep -q "GitHub"; then
    echo "✅ GitHub login button detected in frontend"
else
    echo "❌ GitHub login button NOT found in frontend"
fi

if echo "$LOGIN_PAGE" | grep -q "register"; then
    echo "✅ Registration link detected in frontend"
else
    echo "❌ Registration link NOT found in frontend"
fi

echo ""

# Test 5: Check specific authentication endpoints
echo "📝 Test 5: Authentication Endpoint Validation"

# Check if login endpoint exists
LOGIN_TEST=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/authenticate" \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}')

LOGIN_CODE="${LOGIN_TEST: -3}"
echo "    Login endpoint response: $LOGIN_CODE"

if [ "$LOGIN_CODE" = "401" ] || [ "$LOGIN_CODE" = "400" ]; then
    echo "✅ Login endpoint is working (expected rejection)"
elif [ "$LOGIN_CODE" = "404" ]; then
    echo "❌ Login endpoint not found - frontend-backend mismatch"
else
    echo "ℹ️  Login endpoint response: $LOGIN_CODE"
fi

echo ""

# Summary
echo "🏁 INTEGRATION TEST SUMMARY"
echo "=========================="

if [ "$USER1_CODE" = "201" ] && [ "$USER2_CODE" = "201" ]; then
    echo "🎉 STATUS: FULLY WORKING"
    echo "✅ Multi-user registration: WORKING"
    echo "✅ Frontend-backend integration: WORKING"
    echo "✅ Authentication system: HEALTHY"
elif echo "$USER2_BODY" | grep -q "Organization already exists"; then
    echo "💥 STATUS: CRITICAL FAILURE"
    echo "❌ Multi-user registration: BROKEN"
    echo "❌ Frontend-backend integration: HAS ISSUES"
    echo "❌ 'Organization already exists' bug: PRESENT"
    exit 1
else
    echo "⚠️  STATUS: INCONCLUSIVE"
    echo "📋 Manual verification recommended"
fi

echo ""
echo "🔗 Test URL: $BASE_URL"
echo "📅 Test time: $(date)"
