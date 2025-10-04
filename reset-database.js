// Database Reset Script - Drops and recreates all tables
const { sequelize } = require('./db/models');

async function resetDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        // Drop all tables and recreate them
        await sequelize.sync({ force: true });
        console.log('✅ Database tables recreated successfully!');

        console.log('\n📋 Next steps:');
        console.log('1. Run: npm run create-admin');
        console.log('2. Run: npm run dev:full');
        console.log('3. Login with admin credentials');

    } catch (error) {
        console.error('❌ Database reset failed:', error.message);
    } finally {
        await sequelize.close();
    }
}

resetDatabase();
