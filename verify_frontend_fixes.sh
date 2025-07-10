#!/bin/bash
# Frontend Authentication Verification Script

echo "🔍 Verifying Frontend Authentication Fixes..."

ERRORS=0

# Check 1: Verify Firebase configuration handling
echo "📝 Checking Firebase init.js..."
if grep -q "hasFirebaseConfig" client/src/firebase/init.js; then
    echo "✅ Firebase configuration handling is present"
else
    echo "❌ CRITICAL: Firebase configuration handling is MISSING!"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: Verify social login buttons conditional rendering
echo "�� Checking Register.tsx..."
if grep -q "hasFirebaseConfig &&" client/src/pages/account/public/Register.tsx; then
    echo "✅ Conditional social login buttons are present"
else
    echo "❌ WARNING: Social login buttons may always show"
fi

# Check 3: Verify mobile logout functionality
echo "📝 Checking MobileSidebar.tsx..."
if grep -q "Log Out" client/src/shared/layout/MobileSidebar.tsx; then
    echo "✅ Mobile logout functionality is present"
else
    echo "❌ WARNING: Mobile logout functionality is missing"
fi

# Check 4: Verify desktop logout functionality
echo "📝 Checking DesktopSidebarBottomMenu.tsx..."
if grep -q "Log Out" client/src/shared/layout/desktop-sidebar/DesktopSidebarBottomMenu.tsx; then
    echo "✅ Desktop logout functionality is present"
else
    echo "❌ CRITICAL: Desktop logout functionality is MISSING!"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
    echo "🎉 Frontend verification completed successfully!"
    exit 0
else
    echo "💥 Frontend verification FAILED with $ERRORS critical errors!"
    exit 1
fi
