# DevAgentic Deployment Guide

## 🚀 Quick Start

**IMPORTANT**: The Docker build process has been fixed to handle all file dependencies correctly.

### Prerequisites
- Docker and Docker Compose installed
- At least 4GB RAM available
- Ports 8080 and 5432 available

### 1. Pre-deployment Check
Run the deployment check script to verify everything is ready:
```bash
./deploy-check.sh
```

### 2. Deploy with Docker Compose
```bash
docker compose up --build
```

This will:
- Build the React/TypeScript client with all DevAgentic branding
- Create a multi-stage Docker build
- Start PostgreSQL database
- Start the DevAgentic application

### 3. Access the Application
- **Local access**: http://localhost:8080
- **Domain access**: https://dashboard.devagentic.io (if DNS is configured)

## 🔧 What Was Fixed

### Original Issue
The Dockerfile was trying to copy files from `client/dist/` but this folder didn't exist because:
1. The client hadn't been built yet on the server
2. The Dockerfile expected pre-built files

### Solution
Created a **multi-stage Docker build**:

**Stage 1: Client Builder**
- Uses Node.js Alpine image
- Installs dependencies
- Builds the React client with all DevAgentic branding
- Outputs to `/app/client/dist/`

**Stage 2: Final Image**
- Uses `bytechef/bytechef-server:latest` base image
- Copies built client files from Stage 1
- Includes all necessary files:
  - `index.html`
  - `oauth.html`
  - `favicon.ico`
  - `favicon.svg`
  - `mockServiceWorker.js`
  - `assets/` folder

## 🎨 DevAgentic Branding Applied

✅ **Text Branding**
- "ByteChef" → "DevAgentic"
- "bytechef" → "devagentic"
- "bytechef.io" → "devagentic.io"

✅ **Visual Branding**
- Logo: `logo.svg` → `logo.png` (305×80)
- Favicon: `favicon.svg` → `favicon.ico`
- Dark theme as default

✅ **Configuration**
- Server URLs updated to `dashboard.devagentic.io`
- Package name changed to `devagentic-client`
- Theme storage key updated

## 🗂️ File Structure
```
bytechef/
├── Dockerfile              # ✅ Fixed multi-stage build
├── docker-compose.yml      # ✅ Uses local build
├── deploy-check.sh         # ✅ New deployment validator
├── client/
│   ├── public/
│   │   ├── favicon.ico     # ✅ DevAgentic favicon
│   │   └── logo.png        # ✅ DevAgentic logo
│   ├── src/               # ✅ All components rebranded
│   └── dist/              # ✅ Built by Docker
└── server/                # ✅ URLs updated
```

## 🔍 Troubleshooting

### Build Fails with "favicon.ico not found"
This was the original issue. The new Dockerfile builds the client first, so this should not happen.

### Node.js/npm not found locally
Not a problem - Docker handles the build environment.

### Port conflicts
If ports 8080 or 5432 are in use:
```bash
# Check what's using the ports
lsof -i :8080
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.yml
```

### Database issues
If you need to reset the database:
```bash
docker compose down -v  # Removes volumes
docker compose up --build
```

## 📋 Deployment Checklist

- [ ] Run `./deploy-check.sh` - all checks pass
- [ ] Ports 8080 and 5432 are available
- [ ] Docker daemon is running
- [ ] Run `docker compose up --build`
- [ ] Wait for "Started ByteChefApplication" message
- [ ] Test access at http://localhost:8080
- [ ] Verify DevAgentic branding appears correctly
- [ ] Confirm dark theme is default
- [ ] Test that logo and favicon are correct

## 🎯 Success Indicators

When deployment is successful, you should see:
1. **DevAgentic logo** (PNG format) in the top navigation
2. **Dark theme** as the default appearance
3. **"DevAgentic"** text throughout the interface
4. **DevAgentic favicon** in the browser tab
5. Application accessible at localhost:8080

The application retains all original ByteChef functionality with complete DevAgentic visual branding.
