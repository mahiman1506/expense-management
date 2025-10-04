// Database Setup Script
const mysql = require('mysql2/promise');
const config = require('./config');

console.log('🔧 Database Setup Script');
console.log(`📊 Environment: ${config.app.environment}`);
console.log(`🗄️  Database: ${config.database.name}@${config.database.host}:${config.database.port}`);

async function setupDatabase() {
    try {
        // Connect to MySQL server (without specifying database)
        const connection = await mysql.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
        });

        console.log('Connected to MySQL server');

        // Create database if it doesn't exist
        await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${config.database.name}\``);
        console.log(`Database '${config.database.name}' created or already exists`);

        await connection.end();
        console.log('Database setup completed successfully!');

    } catch (error) {
        console.error('Database setup failed:', error.message);
        console.log('\nTroubleshooting:');
        console.log('1. Make sure MySQL is running');
        console.log('2. Check your MySQL credentials in config.js');
        console.log('3. Try these common MySQL root passwords:');
        console.log('   - root');
        console.log('   - (empty)');
        console.log('   - password');
        console.log('   - admin');
        console.log('\nTo fix: Update the password in config.js');
    }
}

setupDatabase();
