# ByteChef Multi-User Authentication Deployment Guide

## 🚀 Quick Deployment (Fixed Version)

### 1. Deploy with Docker
```bash
# Stop existing containers
docker-compose down

# Rebuild and deploy with latest changes
docker-compose -f docker-compose.yml build --no-cache
docker-compose -f docker-compose.yml up -d

# Check deployment status
docker-compose ps
```

### 2. **🛡️ VERIFY FIXES ARE WORKING (Critical Step)**
```bash
# Run comprehensive verification
./master_verification.sh

# Should show: "🎉 ALL TESTS PASSED! Authentication system is secure."
```

### 3. Test Email/Password Authentication
- ✅ **Multiple Users**: Any email can now register (no "Organization already exists" error)
- ✅ **Admin Role**: admin@devagentic.io automatically gets admin privileges
- ✅ **User Role**: All other emails get user privileges
- ✅ **Login/Logout**: Works for all users including admins

### 4. Configure Social Authentication (Optional)

If you want Google/GitHub login buttons to work:

#### Step 4a: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Create new project or use existing
3. Enable Authentication → Sign-in method → Google & GitHub
4. Get configuration from Project Settings → General → Your apps

#### Step 4b: Create Environment File
```bash
# Create client/.env file
cat > client/.env << 'EOF'
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
EOF
```

#### Step 4c: Rebuild and Deploy
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🛡️ **PREVENTING REGRESSION (CRITICAL)**

### Daily Verification
Run this every day or before any deployment:
```bash
./master_verification.sh
```

### Before Code Changes
Run this before modifying authentication code:
```bash
./pre_deploy_verification.sh
```

### After Any Deployment
```bash
# Wait for services to start
sleep 30

# Verify everything still works
./verify_runtime_api.sh
```

## 🚨 **Auto-Prevention System**

### 1. Set Up Git Hook (Prevents Breaking Changes)
```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Pre-commit authentication verification..."

# Check for critical file modifications
MODIFIED_FILES=$(git diff --cached --name-only)

if echo "$MODIFIED_FILES" | grep -q "AccountController.java\|UserServiceImpl.java\|application.yml"; then
    echo "🚨 Critical authentication files modified - Running verification..."
    ./verify_backend_fixes.sh

    if [ $? -ne 0 ]; then
        echo "❌ Commit BLOCKED - Authentication fixes have been broken!"
        exit 1
    fi
fi

echo "✅ Pre-commit verification passed"
EOF

chmod +x .git/hooks/pre-commit
```

### 2. Set Up File Monitoring
```bash
# Generate baseline checksums (run once after deployment)
./generate_checksums.sh

# Add to crontab for daily monitoring
echo "0 9 * * * cd $(pwd) && ./master_verification.sh >> auth_verification.log 2>&1" | crontab -
```

## 🔧 **Troubleshooting**

### If "Organization already exists" Error Returns:
```bash
# 1. Check if backend fixes are still there
./verify_backend_fixes.sh

# 2. If verification fails, re-apply fixes
# 3. Rebuild Docker containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# 4. Verify fix is working
./verify_runtime_api.sh
```

### If Social Login Stops Working:
```bash
# 1. Check Firebase configuration
./verify_frontend_fixes.sh

# 2. Verify .env file exists
ls -la client/.env

# 3. Check Firebase console for any issues
```

### If Admin User Loses Privileges:
```bash
# 1. Check user service logic
grep -n "admin@devagentic.io" server/libs/platform/platform-user/platform-user-service/src/main/java/com/bytechef/platform/user/service/UserServiceImpl.java

# 2. Should show admin role assignment logic
```

## 📊 **Verification Scripts Explained**

- `./master_verification.sh` - Complete system check
- `./verify_backend_fixes.sh` - Backend code verification
- `./verify_frontend_fixes.sh` - Frontend code verification
- `./verify_runtime_api.sh` - Live API testing
- `./pre_deploy_verification.sh` - Pre-deployment safety check
- `./generate_checksums.sh` - File integrity baseline

## 🎯 **Success Indicators**

✅ **Email Registration**: Multiple users can register without errors
✅ **Admin Role**: admin@devagentic.io has admin dashboard access
✅ **User Role**: Other emails have user-level access
✅ **Social Login**: Google/GitHub buttons appear (if configured)
✅ **Logout**: All users can logout from both desktop and mobile
✅ **Verification**: `./master_verification.sh` shows all tests passing

## 🚨 **Red Flags to Watch For**

❌ "Organization already exists" error on registration
❌ Only one user can register
❌ admin@devagentic.io doesn't have admin access
❌ Social login buttons missing
❌ Logout option not available
❌ `./master_verification.sh` shows failures

---

**💡 Pro Tip**: Always run `./master_verification.sh` after any system changes to ensure authentication remains secure!
