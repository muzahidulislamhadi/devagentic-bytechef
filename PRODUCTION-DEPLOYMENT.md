# DevAgentic Production Deployment Guide

This guide explains how to deploy DevAgentic in production with professional-grade configuration.

## 🌟 New Features

### ✅ Resource Center Removed
- Eliminated CommandBar dependency and external Resource Center
- Simplified architecture and reduced external dependencies
- Improved performance and security

### ✅ Stunning Home Page
- Billion-dollar company landing page design
- Professional hero section with gradient backgrounds
- Feature showcase with animated cards
- Statistics section and call-to-action
- Fully responsive and theme-aware

### ✅ Production-Ready Deployment
- Direct access on port 80 (no :8080 needed)
- Professional Docker configuration
- Automated deployment script
- Secure environment variable management

## 🚀 Quick Deployment

### Option 1: Automatic Deployment (Recommended)

```bash
# Make the script executable
chmod +x deploy-production.sh

# Run as root (required for port 80)
sudo ./deploy-production.sh
```

### Option 2: Manual Deployment

```bash
# Create production environment file
cp .env.example .env.prod

# Edit environment variables
nano .env.prod

# Deploy using production compose
sudo docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build -d
```

## 🌐 Access Your Application

After deployment, your DevAgentic instance will be accessible at:

- **Direct IP Access**: `http://YOUR_SERVER_IP`
- **Local Access**: `http://localhost`
- **Domain**: Point your domain A record to your server IP

## 📊 Monitoring & Management

### Check Service Status
```bash
docker-compose -f docker-compose.prod.yml ps
```

### View Logs
```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f bytechef
```

### Stop Services
```bash
sudo docker-compose -f docker-compose.prod.yml down
```

## 🔒 Security Configuration

### Environment Variables
The deployment script automatically generates secure passwords in `.env.prod`:

```bash
POSTGRES_PASSWORD=bytechef_secure_[random]
POSTGRES_USER=bytechef
POSTGRES_DB=bytechef
BYTECHEF_REMEMBER_ME_KEY=[secure_random_key]
BYTECHEF_FEATURE_FLAGS=ff-520:true
```

### Firewall Configuration
```bash
# Allow HTTP traffic
sudo ufw allow 80/tcp

# Allow HTTPS traffic (for future SSL setup)
sudo ufw allow 443/tcp

# Allow SSH
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

## 🌍 Domain Configuration

### DNS Setup
1. Point your domain's A record to your server IP
2. Update your DNS settings with your domain provider

### SSL Certificate (Optional)
For HTTPS support, you can add SSL certificates:

```bash
# Install Certbot
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Add SSL configuration to docker-compose.prod.yml
```

## 🔧 Advanced Configuration

### Resource Limits
The production configuration includes:
- **Database**: 1GB RAM limit, 512MB reserved
- **Application**: 4GB RAM limit, 2GB reserved
- **Health Checks**: Automatic service monitoring
- **Restart Policy**: Services restart unless manually stopped

### Feature Flags
Enable/disable features by updating `.env.prod`:
```bash
BYTECHEF_FEATURE_FLAGS=ff-520:true,other-feature:false
```

## 🛠 Troubleshooting

### Common Issues

#### Port 80 Permission Denied
```bash
# Make sure you're running as root
sudo docker-compose -f docker-compose.prod.yml up -d
```

#### Service Health Checks Failing
```bash
# Check if services are responding
curl -f http://localhost/actuator/health

# Check Docker logs
docker-compose -f docker-compose.prod.yml logs bytechef
```

#### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose -f docker-compose.prod.yml exec postgres pg_isready

# Check database logs
docker-compose -f docker-compose.prod.yml logs postgres
```

## 📈 Performance Optimization

### Database Optimization
For high-traffic deployments, consider:
- Increasing PostgreSQL shared_buffers
- Setting up database connection pooling
- Regular database maintenance

### Application Optimization
- Monitor memory usage with `docker stats`
- Adjust JVM heap size if needed
- Enable application-level caching

## 🔄 Updates & Maintenance

### Updating the Application
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
sudo docker-compose -f docker-compose.prod.yml up --build -d
```

### Database Backups
```bash
# Create backup
docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U bytechef bytechef > backup_$(date +%Y%m%d).sql

# Restore backup
docker-compose -f docker-compose.prod.yml exec -T postgres psql -U bytechef bytechef < backup_file.sql
```

## 📞 Support

For production support and enterprise features, contact the DevAgentic team.

---

**✨ Congratulations! Your DevAgentic instance is now running in production with enterprise-grade configuration.**
