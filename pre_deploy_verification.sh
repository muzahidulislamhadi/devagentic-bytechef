#!/bin/bash
# Pre-Deployment Authentication Verification

echo "🚨 Pre-Deployment Authentication Verification"

ERRORS=0

# Run backend verification
echo "=== Backend Verification ==="
if ./verify_backend_fixes.sh; then
    echo "✅ Backend verification passed"
else
    echo "❌ Backend verification failed"
    ERRORS=$((ERRORS + 1))
fi

echo ""

# Run frontend verification  
echo "=== Frontend Verification ==="
if ./verify_frontend_fixes.sh; then
    echo "✅ Frontend verification passed"
else
    echo "❌ Frontend verification failed"
    ERRORS=$((ERRORS + 1))
fi

echo ""

if [ $ERRORS -eq 0 ]; then
    echo "🎉 All pre-deployment checks passed - Safe to deploy"
    exit 0
else
    echo "💥 Pre-deployment checks FAILED with $ERRORS errors - Deployment BLOCKED"
    echo "📋 Please fix the issues above before deploying"
    exit 1
fi
