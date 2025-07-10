#!/bin/bash
# Backend Authentication Verification Script

echo "🔍 Verifying Backend Authentication Fixes..."

ERRORS=0

# Check 1: Verify AccountController allows multi-user registration
echo "📝 Checking AccountController.java..."
if grep -q "In single-tenant mode, always allow registration" server/libs/platform/platform-user/platform-user-rest/platform-user-rest-impl/src/main/java/com/bytechef/platform/user/web/rest/AccountController.java; then
    echo "✅ Multi-user registration logic is present"
else
    echo "❌ CRITICAL: Multi-user registration logic is MISSING!"
    ERRORS=$((ERRORS + 1))
fi

# Check 2: Verify admin role assignment 
echo "�� Checking UserServiceImpl.java..."
if grep -q "admin@devagentic.io" server/libs/platform/platform-user/platform-user-service/src/main/java/com/bytechef/platform/user/service/UserServiceImpl.java; then
    echo "✅ Admin role assignment logic is present"
else
    echo "❌ CRITICAL: Admin role assignment logic is MISSING!"
    ERRORS=$((ERRORS + 1))
fi

# Check 3: Verify feature flag is enabled
echo "📝 Checking application.yml..."
if grep -q "ff-1874" server/apps/server-app/src/main/resources/config/application.yml; then
    echo "✅ Social login feature flag is enabled"
else
    echo "❌ WARNING: Social login feature flag is missing"
fi

# Check 4: Verify the critical logic patterns
echo "📝 Checking for organization restriction removal..."
if ! grep -q "ORGANIZATION_ALREADY_EXISTS" server/libs/platform/platform-user/platform-user-rest/platform-user-rest-impl/src/main/java/com/bytechef/platform/user/web/rest/AccountController.java; then
    echo "✅ Organization restriction properly removed"
else
    echo "❌ CRITICAL: Organization restriction may still be active!"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
    echo "🎉 Backend verification completed successfully!"
    exit 0
else
    echo "💥 Backend verification FAILED with $ERRORS critical errors!"
    exit 1
fi
