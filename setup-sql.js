// Execute SQL Setup Script
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const config = require('./config');

async function executeSQLSetup() {
    let connection;

    try {
        console.log('🔧 Setting up Expense Management Database...');
        console.log(`📊 Environment: ${config.app.environment}`);
        console.log(`🗄️  MySQL Server: ${config.database.host}:${config.database.port}`);

        // Connect to MySQL server (without specifying database)
        connection = await mysql.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
        });

        console.log('✅ Connected to MySQL server');

        // Read and execute SQL file
        const sqlFile = path.join(__dirname, 'database.sql');
        const sqlContent = fs.readFileSync(sqlFile, 'utf8');

        // Split SQL content by semicolon and execute each statement
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('SELECT'));

        console.log(`📝 Executing ${statements.length} SQL statements...`);

        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (statement.trim()) {
                try {
                    await connection.execute(statement);
                    console.log(`✅ Statement ${i + 1}/${statements.length} executed`);
                } catch (error) {
                    // Skip errors for statements that might already exist
                    if (!error.message.includes('already exists') &&
                        !error.message.includes('Duplicate') &&
                        !error.message.includes('Unknown database')) {
                        console.log(`⚠️  Statement ${i + 1} warning: ${error.message}`);
                    }
                }
            }
        }

        console.log('🎉 Database setup completed successfully!');
        console.log('');
        console.log('📋 Next steps:');
        console.log('1. Run: npm run dev:full');
        console.log('2. Open: http://localhost:3000');
        console.log('3. Login with: admin@expense.com / admin123');
        console.log('');
        console.log('🗄️  Database: expense-management');
        console.log('👤 Admin User: admin@expense.com');
        console.log('🔑 Password: admin123');

    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. Make sure MySQL is running');
        console.log('2. Check your MySQL credentials in config.js');
        console.log('3. Try these common MySQL root passwords:');
        console.log('   - (empty)');
        console.log('   - root');
        console.log('   - password');
        console.log('   - admin');
        console.log('');
        console.log('💡 To fix: Update the password in config.js');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

executeSQLSetup();
