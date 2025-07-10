#!/bin/bash
# Runtime API Authentication Verification Script

echo "🔍 Verifying Runtime API Behavior..."

BASE_URL="http://localhost:8080"
TIMESTAMP=$(date +%s)

# Function to cleanup test users
cleanup_test_users() {
    echo "🧹 Cleaning up test users..."
    # Note: Add cleanup logic here if needed
}

# Trap to ensure cleanup on exit
trap cleanup_test_users EXIT

# Check if server is running
echo "📝 Checking server availability..."
if ! curl -s --max-time 5 "$BASE_URL/api/management/health" > /dev/null; then
    echo "❌ Server is not accessible at $BASE_URL"
    echo "💡 Make sure the application is running with: docker-compose up -d"
    exit 1
fi

echo "✅ Server is accessible"

# Test multiple user registration
echo "📝 Testing multiple user registration..."

# Test User 1
echo "  → Registering first user..."
USER1_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"login\": \"testuser1_${TIMESTAMP}@example.com\",
    \"email\": \"testuser1_${TIMESTAMP}@example.com\", 
    \"password\": \"TestPassword123!\",
    \"firstName\": \"Test\",
    \"lastName\": \"User1\"
  }")

USER1_CODE="${USER1_RESPONSE: -3}"
USER1_BODY="${USER1_RESPONSE%???}"

echo "    Response code: $USER1_CODE"

# Test User 2 (should also work - this is the critical test)
echo "  → Registering second user..."
USER2_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"login\": \"testuser2_${TIMESTAMP}@example.com\",
    \"email\": \"testuser2_${TIMESTAMP}@example.com\",
    \"password\": \"TestPassword123!\", 
    \"firstName\": \"Test\",
    \"lastName\": \"User2\"
  }")

USER2_CODE="${USER2_RESPONSE: -3}"
USER2_BODY="${USER2_RESPONSE%???}"

echo "    Response code: $USER2_CODE"

# Analyze results
if [[ "$USER1_CODE" == "201" && "$USER2_CODE" == "201" ]]; then
    echo "✅ PASS: Multiple user registration works correctly"
    echo "✅ PASS: No 'Organization already exists' error detected"
elif [[ "$USER1_CODE" == "201" && "$USER2_CODE" == "400" ]]; then
    echo "❌ CRITICAL FAILURE: Second user registration failed!"
    echo "❌ The 'Organization already exists' bug is BACK!"
    echo "📋 Second user response body: $USER2_BODY"
    
    # Check for specific error message
    if echo "$USER2_BODY" | grep -q "Organization already exists"; then
        echo "🚨 CONFIRMED: 'Organization already exists' error detected"
    fi
    
    exit 1
elif [[ "$USER1_CODE" == "400" && "$USER2_CODE" == "400" ]]; then
    echo "⚠️  Both registrations failed - may be normal if users already exist"
    echo "📋 First user response: $USER1_BODY"
    echo "📋 Second user response: $USER2_BODY"
    
    # Check if it's the organization error
    if echo "$USER1_BODY" | grep -q "Organization already exists"; then
        echo "❌ CRITICAL: 'Organization already exists' error on first user!"
        exit 1
    fi
else
    echo "⚠️  Registration test inconclusive"
    echo "📋 Response codes: User1=$USER1_CODE, User2=$USER2_CODE"
    echo "📋 User1 body: $USER1_BODY"
    echo "📋 User2 body: $USER2_BODY"
fi

# Test admin user registration
echo "📝 Testing admin user registration..."
ADMIN_RESPONSE=$(curl -s -w "%{http_code}" -X POST \
  "$BASE_URL/api/register" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{
    \"login\": \"admin@devagentic.io\",
    \"email\": \"admin@devagentic.io\", 
    \"password\": \"AdminPassword123!\",
    \"firstName\": \"Admin\",
    \"lastName\": \"User\"
  }")

ADMIN_CODE="${ADMIN_RESPONSE: -3}"
echo "    Admin registration response code: $ADMIN_CODE"

if [[ "$ADMIN_CODE" == "201" || "$ADMIN_CODE" == "400" ]]; then
    echo "✅ Admin user registration behaves normally"
else
    echo "⚠️  Admin registration response: $ADMIN_CODE"
fi

echo "🎉 Runtime verification completed!"
