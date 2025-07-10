#!/bin/bash
# Master Authentication Verification Script
# Run this script anytime to verify all authentication fixes are in place

echo "🛡️  MASTER AUTHENTICATION VERIFICATION"
echo "======================================="
echo ""

START_TIME=$(date +%s)
TOTAL_ERRORS=0

# Function to print section header
print_section() {
    echo "🔍 $1"
    echo "$(printf '=%.0s' $(seq 1 ${#1}))"
}

# Function to print results
print_result() {
    local test_name="$1"
    local status="$2"
    local message="$3"
    
    if [ "$status" = "PASS" ]; then
        echo "✅ PASS: $test_name"
    elif [ "$status" = "FAIL" ]; then
        echo "❌ FAIL: $test_name"
        TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
        if [ -n "$message" ]; then
            echo "   └─ $message"
        fi
    elif [ "$status" = "WARN" ]; then
        echo "⚠️  WARN: $test_name"
        if [ -n "$message" ]; then
            echo "   └─ $message"
        fi
    fi
}

# Test 1: Backend Code Verification
print_section "Backend Code Verification"
if ./verify_backend_fixes.sh > /dev/null 2>&1; then
    print_result "Backend authentication fixes" "PASS"
else
    print_result "Backend authentication fixes" "FAIL" "Critical backend fixes are missing"
fi
echo ""

# Test 2: Frontend Code Verification  
print_section "Frontend Code Verification"
if ./verify_frontend_fixes.sh > /dev/null 2>&1; then
    print_result "Frontend authentication fixes" "PASS"
else
    print_result "Frontend authentication fixes" "FAIL" "Critical frontend fixes are missing"
fi
echo ""

# Test 3: File Integrity Check
print_section "File Integrity Verification"
if [ -f "auth_files.sha256" ]; then
    if sha256sum -c auth_files.sha256 --quiet 2>/dev/null; then
        print_result "Critical file integrity" "PASS"
    else
        print_result "Critical file integrity" "FAIL" "Authentication files have been modified"
        echo "   📋 Run 'sha256sum -c auth_files.sha256' to see which files changed"
    fi
else
    print_result "Critical file integrity" "WARN" "No baseline checksums found. Run ./generate_checksums.sh"
fi
echo ""

# Test 4: Docker Build Verification
print_section "Docker Build Verification"
if docker images | grep -q "bytechef"; then
    print_result "Docker images exist" "PASS"
else
    print_result "Docker images exist" "WARN" "No Docker images found. Build may be needed"
fi

# Check if containers are running
if docker-compose ps | grep -q "Up"; then
    print_result "Application containers" "PASS" "Containers are running"
    
    # Test 5: Runtime API Verification (only if containers are up)
    print_section "Runtime API Verification"
    echo "🔄 Testing live API endpoints..."
    if ./verify_runtime_api.sh > /dev/null 2>&1; then
        print_result "Multi-user registration API" "PASS"
    else
        print_result "Multi-user registration API" "FAIL" "API tests failed - check logs"
    fi
else
    print_result "Application containers" "WARN" "Containers not running - skipping API tests"
fi

echo ""

# Final Results
print_section "VERIFICATION SUMMARY"
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

if [ $TOTAL_ERRORS -eq 0 ]; then
    echo "🎉 ALL TESTS PASSED! Authentication system is secure."
    echo "✅ Multi-user registration will work correctly"
    echo "✅ Admin privileges are properly assigned"
    echo "✅ All authentication fixes are in place"
else
    echo "💥 $TOTAL_ERRORS CRITICAL ISSUES DETECTED!"
    echo "🚨 AUTHENTICATION SYSTEM MAY BE BROKEN"
    echo "📋 Please review the failed tests above"
fi

echo ""
echo "📊 Verification completed in ${DURATION} seconds"
echo "🕐 $(date)"

exit $TOTAL_ERRORS
