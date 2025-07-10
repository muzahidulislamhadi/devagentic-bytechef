#!/bin/bash
# Generate checksums for critical authentication files

echo "📝 Generating checksums for critical authentication files..."

# Create checksums for critical files
sha256sum server/libs/platform/platform-user/platform-user-rest/platform-user-rest-impl/src/main/java/com/bytechef/platform/user/web/rest/AccountController.java > auth_files.sha256
sha256sum server/libs/platform/platform-user/platform-user-service/src/main/java/com/bytechef/platform/user/service/UserServiceImpl.java >> auth_files.sha256  
sha256sum server/apps/server-app/src/main/resources/config/application.yml >> auth_files.sha256
sha256sum client/src/firebase/init.js >> auth_files.sha256
sha256sum client/src/pages/account/public/Login.tsx >> auth_files.sha256
sha256sum client/src/pages/account/public/Register.tsx >> auth_files.sha256

echo "✅ Checksums saved to auth_files.sha256"
echo "📋 Critical files being monitored:"
echo "  - AccountController.java (backend multi-user logic)"
echo "  - UserServiceImpl.java (admin role assignment)" 
echo "  - application.yml (feature flags)"
echo "  - Firebase init.js (social login)"
echo "  - Login.tsx (authentication UI)"
echo "  - Register.tsx (registration UI)"
