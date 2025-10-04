# Configuration Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Node Environment
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=expense_management
DB_USER=root
DB_PASS=

# API Configuration
BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
PORT=3001

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=10

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=debug
LOG_FILE=./logs/app.log

# Rate Limiting
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Timezone
TZ=UTC
```

## Configuration Features

The new `config.js` includes:

### 🗄️ Database Configuration
- Connection pooling for better performance
- Environment-specific logging
- Proper MySQL configuration
- Connection timeout settings

### 🔐 Security Configuration
- JWT secret management
- Password hashing rounds
- CORS configuration
- Rate limiting

### 📁 File Upload Configuration
- File size limits
- Allowed file types
- Upload path configuration

### 📊 Logging Configuration
- Environment-specific log levels
- File logging support
- SQL query logging in development

### 🌐 API Configuration
- Port configuration
- CORS settings
- Request size limits

## Usage

The configuration automatically adapts based on:
- `NODE_ENV` environment variable
- Individual environment variables
- Sensible defaults for development

## Production Setup

For production, set:
```bash
NODE_ENV=production
DB_PASS=your-secure-password
JWT_SECRET=your-production-secret-key
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
```
