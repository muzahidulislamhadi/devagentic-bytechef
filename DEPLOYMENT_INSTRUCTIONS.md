# ByteChef Production Deployment Instructions

## Overview
This document provides step-by-step instructions for deploying ByteChef to production with the following enhancements:
- Database cleanup for fresh deployment
- Firebase Authentication integration
- Brand color updates (hsl(142 76% 55%))
- Admin user configuration (admin@devagentic.io)

## Prerequisites
- Docker and Docker Compose installed
- Firebase project configured
- PostgreSQL database access (for cleanup)

## Step 1: Database Cleanup (Fresh Deployment)

### Option A: Run SQL Cleanup Script
1. Connect to your PostgreSQL database
2. Execute the cleanup script:
   ```sql
   -- Run the content of server/scripts/cleanup-users.sql
   -- This will remove all existing users and reset sequences
   ```

### Option B: Fresh Database
1. Drop and recreate the database for a completely fresh start
2. The application will handle initial schema creation via Liquibase

## Step 2: Firebase Configuration

### Setup Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication and configure providers:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Enable GitHub provider (optional - will work when enabled)

### Get Firebase Configuration
1. Go to Project Settings > General
2. Add a web app if not already added
3. Copy the Firebase config object

### Set Environment Variables
Create a `.env` file in the `client/` directory:
```env
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Step 3: Admin User Configuration

### Important Notes
- The first user to register will become admin
- admin@devagentic.io will ALWAYS get admin privileges (via Firebase auth)
- All other users get regular user privileges

### Admin Login Options
1. **Email/Password**: Register as admin@devagentic.io using the registration form
2. **Google OAuth**: Sign in with Google using admin@devagentic.io email
3. **GitHub OAuth**: Sign in with GitHub using admin@devagentic.io email

## Step 4: Docker Deployment

### Build and Deploy
1. Navigate to the project root directory
2. Set up environment variables in the server configuration
3. Build and start the application:
   ```bash
   # Build the Docker images
   docker-compose build

   # Start the application
   docker-compose up -d
   ```

### Verify Deployment
1. Check that all containers are running:
   ```bash
   docker-compose ps
   ```
2. Check application logs:
   ```bash
   docker-compose logs -f server-app
   ```

## Step 5: First Admin Registration

### After deployment:
1. Navigate to the application URL
2. Go to the registration page
3. Register with email: admin@devagentic.io
4. This user will have admin privileges

### Alternative (Firebase Auth):
1. Navigate to the login page
2. Click "Continue with Google" or "Continue with GitHub"
3. Use admin@devagentic.io for authentication
4. User will be automatically assigned admin privileges

## Step 6: Verification

### Check Admin Access
1. Login as admin@devagentic.io
2. Verify admin features are accessible
3. Check that the interface shows the new brand colors (green theme)

### Check UI Updates
1. Verify the welcome page shows the simplified content
2. Check that all buttons and icons use the green brand color (hsl(142 76% 55%))
3. Confirm project list hover states work correctly

## Design Changes Applied

### Color Scheme
- Primary color changed from blue (hsl(217, 91%, 60%)) to green (hsl(142 76% 55%))
- All brand colors updated consistently across light and dark themes
- Hover states fixed to maintain text visibility

### UI Improvements
- Simplified welcome page with focused content
- Removed unnecessary feature sections
- Fixed hover states that caused text to become invisible
- Maintained all existing functionality

## Troubleshooting

### Database Issues
- If users can't register: Check database connectivity and Liquibase migrations
- If admin privileges aren't working: Verify the first user logic in UserServiceImpl.java

### Firebase Issues
- If social login fails: Check Firebase configuration and environment variables
- If admin role isn't assigned: Verify the email matching logic in Login.tsx and Register.tsx

### Color Issues
- If old colors still show: Clear browser cache and check CSS variables in components.css
- If text is invisible: Check hover states and contrast ratios

## Security Notes
- Ensure environment variables are properly secured
- Firebase configuration should be restricted to your domain
- Database cleanup script removes all user data - use with caution
- Admin email check is case-sensitive

## Production Checklist
- [ ] Database cleaned/reset for fresh deployment
- [ ] Firebase project configured with authentication providers
- [ ] Environment variables set correctly
- [ ] Docker containers built and running
- [ ] Admin user (admin@devagentic.io) registered successfully
- [ ] Brand colors applied consistently
- [ ] All functionality tested and working

## Support
For issues related to:
- Firebase setup: Check Firebase Console and authentication configuration
- Database issues: Verify PostgreSQL connectivity and Liquibase migrations
- UI/Color issues: Check CSS variables and browser cache
- Admin access: Verify first user registration logic and email matching
