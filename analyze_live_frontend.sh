#!/bin/bash
# Analyze what frontend code is actually deployed

echo "🔍 ANALYZING LIVE FRONTEND CODE"
echo "==============================="

BASE_URL="https://dashboard.devagentic.io"

# Download and analyze the actual login page
echo "📝 Downloading login page..."
curl -s "$BASE_URL/login" > live_login.html

echo "📝 Analyzing login page structure..."

# Check for our Firebase integration
if grep -q "firebase" live_login.html; then
    echo "✅ Firebase code detected in live frontend"
else
    echo "❌ Firebase code NOT found in live frontend"
    echo "🚨 This means our Firebase integration is NOT deployed"
fi

# Check for social login buttons
if grep -i -q "google" live_login.html; then
    echo "✅ Google references found in live frontend"
else
    echo "❌ Google login NOT found in live frontend"
fi

if grep -i -q "github" live_login.html; then
    echo "✅ GitHub references found in live frontend"
else
    echo "❌ GitHub login NOT found in live frontend"
fi

# Check for registration form/link
if grep -i -q "register\|sign.*up" live_login.html; then
    echo "✅ Registration functionality found in live frontend"
else
    echo "❌ Registration functionality NOT found in live frontend"
fi

# Check for our specific code changes
if grep -q "hasFirebaseConfig" live_login.html; then
    echo "✅ Our hasFirebaseConfig logic is deployed"
else
    echo "❌ Our hasFirebaseConfig logic is NOT deployed"
    echo "🚨 This means our fixes are NOT in the live deployment"
fi

echo ""
echo "📝 Checking frontend build info..."

# Download main JS bundle to check build
MAIN_JS=$(curl -s "$BASE_URL" | grep -o 'src="[^"]*\.js"' | head -1 | sed 's/src="//;s/"//')
if [ -n "$MAIN_JS" ]; then
    echo "📦 Main JS bundle: $MAIN_JS"
    
    # Download and check the bundle
    FULL_URL="$BASE_URL$MAIN_JS"
    curl -s "$FULL_URL" > live_bundle.js
    
    if grep -q "hasFirebaseConfig" live_bundle.js; then
        echo "✅ Our code changes found in JS bundle"
    else
        echo "❌ Our code changes NOT found in JS bundle"
        echo "🚨 The live deployment is using OLD code"
    fi
else
    echo "⚠️  Could not detect main JS bundle"
fi

echo ""
echo "🏁 ANALYSIS RESULTS"
echo "=================="

# Determine deployment status
if ! grep -q "hasFirebaseConfig" live_login.html && ! grep -q "hasFirebaseConfig" live_bundle.js 2>/dev/null; then
    echo "💥 DEPLOYMENT STATUS: OUTDATED"
    echo "❌ The live deployment does NOT have our authentication fixes"
    echo "❌ This explains why you're still seeing the old login/register pages"
    echo ""
    echo "🛠️  SOLUTION NEEDED:"
    echo "1. Re-deploy the application with our fixed code"
    echo "2. Ensure Docker build includes all our changes"
    echo "3. Verify the deployment pipeline is working correctly"
else
    echo "✅ DEPLOYMENT STATUS: UP TO DATE"
    echo "✅ Our fixes are deployed, but there may be other issues"
fi

# Cleanup
rm -f live_login.html live_bundle.js

