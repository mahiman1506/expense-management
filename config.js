// Database and API Configuration
// This file handles configuration for different environments

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    // Database Configuration
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        name: process.env.DB_NAME || 'expense-management',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '', // Empty password for local MySQL
        dialect: 'mysql',
        logging: isDevelopment ? console.log : false, // Show SQL queries in development
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true, // Add createdAt and updatedAt to all tables
            underscored: false, // Use camelCase for attributes
            freezeTableName: true // Don't pluralize table names
        }
    },

    // API Configuration
    api: {
        backendUrl: process.env.BACKEND_URL || 'http://localhost:3001',
        publicApiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
        port: process.env.PORT || 3001,
        cors: {
            origin: isProduction
                ? process.env.CORS_ORIGIN?.split(',') || ['https://yourdomain.com']
                : ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        }
    },

    // Authentication Configuration
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'expense-management-secret-key-change-in-production',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
        bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10
    },

    // Application Configuration
    app: {
        name: 'Expense Management System',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timezone: process.env.TZ || 'UTC'
    },

    // File Upload Configuration
    upload: {
        maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        uploadPath: process.env.UPLOAD_PATH || './uploads'
    },

    // Email Configuration (for future use)
    email: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        user: process.env.EMAIL_USER || '',
        password: process.env.EMAIL_PASSWORD || ''
    },

    // Logging Configuration
    logging: {
        level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
        file: process.env.LOG_FILE || './logs/app.log'
    },

    // Rate Limiting Configuration
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000, // 15 minutes
        max: parseInt(process.env.RATE_LIMIT_MAX) || 100 // limit each IP to 100 requests per windowMs
    }
};