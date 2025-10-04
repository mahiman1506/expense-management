// Create Admin User Script
const { sequelize, Company, User } = require('./db/models');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database');

        // Check if admin user already exists
        const existingAdmin = await User.findOne({ where: { email: 'admin@expense.com' } });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@expense.com');
            console.log('Password: admin123');
            return;
        }

        // Create company
        const company = await Company.create({
            name: 'Admin Company',
            country: 'USA',
            currency: 'USD'
        });

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const adminUser = await User.create({
            name: 'System Administrator',
            email: 'admin@expense.com',
            password: hashedPassword,
            role: 'Admin',
            companyId: company.id
        });

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@expense.com');
        console.log('🔑 Password: admin123');
        console.log('🏢 Company: Admin Company');
        console.log('👤 Role: Admin');

    } catch (error) {
        console.error('Failed to create admin user:', error.message);
    } finally {
        await sequelize.close();
    }
}

createAdminUser();
