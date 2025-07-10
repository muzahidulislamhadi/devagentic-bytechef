#!/bin/bash
# Check for Docker and NPM build cache issues

echo "🔍 CHECKING BUILD CACHE AND OLD CODE ISSUES"
echo "============================================="
echo ""

# Step 1: Check if there's a dist folder with old builds
echo "📝 Step 1: Checking client/dist folder"
if [ -d "client/dist" ]; then
    echo "⚠️  client/dist folder exists - could contain old builds"
    echo "📁 Contents of client/dist:"
    ls -la client/dist/ 2>/dev/null || echo "Empty or inaccessible"
    echo ""
    
    # Check if dist has our fixes
    if [ -f "client/dist/index.html" ]; then
        echo "🔍 Checking if dist/index.html has our Firebase fixes..."
        if grep -q "hasFirebaseConfig" client/dist/index.html 2>/dev/null; then
            echo "✅ dist/index.html contains our fixes"
        elif [ -d "client/dist/assets" ]; then
            echo "🔍 Checking JavaScript bundles in dist/assets..."
            BUNDLE_WITH_FIXES=$(find client/dist/assets -name "*.js" -exec grep -l "hasFirebaseConfig" {} \; 2>/dev/null | head -1)
            if [ -n "$BUNDLE_WITH_FIXES" ]; then
                echo "✅ Found our fixes in: $BUNDLE_WITH_FIXES"
            else
                echo "❌ No Firebase fixes found in dist bundles - OLD BUILD DETECTED"
            fi
        else
            echo "❌ dist/index.html does not contain our fixes - OLD BUILD"
        fi
    else
        echo "ℹ️  No index.html in dist folder"
    fi
else
    echo "✅ No client/dist folder - fresh build will be used"
fi

echo ""

# Step 2: Check Docker build context
echo "📝 Step 2: Analyzing Docker build process"
echo "🔍 Dockerfile analysis:"
echo "  - Uses multi-stage build ✓"
echo "  - Stage 1: Builds client with npm run build"
echo "  - Stage 2: Copies built files to server image"
echo ""

echo "🔍 Build process flow:"
echo "  1. Copies client/package*.json"
echo "  2. Runs npm install --legacy-peer-deps"
echo "  3. Copies entire client/ folder (including our fixes)"
echo "  4. Runs npm run build (should include our fixes)"
echo "  5. Copies dist output to final image"
echo ""

# Step 3: Check for npm cache issues
echo "📝 Step 3: Checking NPM cache and build config"
cd client 2>/dev/null || { echo "❌ Cannot access client directory"; exit 1; }

echo "🔍 NPM build script:"
if [ -f "package.json" ]; then
    echo "📦 Build command:"
    grep -A5 -B5 '"build"' package.json | grep '"build"'
    echo ""
    
    echo "📦 Scripts section:"
    grep -A10 '"scripts"' package.json | head -15
else
    echo "❌ No package.json found"
fi

echo ""

# Step 4: Check Vite config for build issues
echo "📝 Step 4: Checking Vite build configuration"
if [ -f "vite.config.mts" ]; then
    echo "🔍 Vite config (potential cache issues):"
    echo "📁 Looking for build cache directories or settings..."
    grep -A5 -B5 "cache\|build\|outDir" vite.config.mts | head -20
else
    echo "⚠️  No vite.config.mts found"
fi

echo ""

# Step 5: Check node_modules for Firebase
echo "📝 Step 5: Checking Firebase installation"
if [ -d "node_modules/firebase" ]; then
    echo "✅ Firebase is installed in node_modules"
    echo "📦 Firebase version:"
    grep '"version"' node_modules/firebase/package.json 2>/dev/null || echo "Version not found"
else
    echo "❌ Firebase not found in node_modules"
fi

echo ""

# Step 6: Check if our source files have the fixes
echo "📝 Step 6: Verifying source files have our fixes"
cd .. # Back to root

echo "🔍 Checking source files for our authentication fixes:"

if grep -q "hasFirebaseConfig" client/src/firebase/init.js; then
    echo "✅ client/src/firebase/init.js has hasFirebaseConfig"
else
    echo "❌ client/src/firebase/init.js missing hasFirebaseConfig"
fi

if grep -q 'admin@devagentic.io' client/src/pages/account/public/Login.tsx; then
    echo "✅ client/src/pages/account/public/Login.tsx has admin role logic"
else
    echo "❌ client/src/pages/account/public/Login.tsx missing admin role logic"
fi

if grep -q 'admin@devagentic.io' client/src/pages/account/public/Register.tsx; then
    echo "✅ client/src/pages/account/public/Register.tsx has admin role logic"
else
    echo "❌ client/src/pages/account/public/Register.tsx missing admin role logic"
fi

echo ""

# Step 7: Recommendations
echo "📝 Step 7: Build Cache Issue Recommendations"
echo ""

echo "🛠️  TO FIX POTENTIAL BUILD CACHE ISSUES:"
echo ""

echo "1. 🗑️  CLEAR ALL CACHES:"
echo "   cd client && rm -rf dist node_modules .vite"
echo "   npm install --legacy-peer-deps"
echo ""

echo "2. 🐳 CLEAR DOCKER CACHES:"
echo "   docker system prune -f"
echo "   docker builder prune -f"
echo ""

echo "3. 🔄 FORCE FRESH BUILD:"
echo "   docker-compose build --no-cache"
echo "   # This forces complete rebuild without using any cached layers"
echo ""

echo "4. 🧪 TEST BUILD LOCALLY:"
echo "   cd client && npm run build"
echo "   # Check if dist folder contains our fixes"
echo ""

echo "5. 🎯 VERIFY FINAL IMAGE:"
echo "   docker run --rm bytechef cat /opt/bytechef/client/index.html | grep firebase"
echo "   # Should show Firebase-related code if fixes are included"
echo ""

echo "📅 Analysis completed: $(date)"
