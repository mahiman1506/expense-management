// Complete Express backend for Expense Management System
const express = require('express');
const cors = require('cors');
const { Company, User, Expense, ApprovalWorkflow, ApprovalRule, ExpenseHistory, EmployeeManager } = require('../db/models');
const bcrypt = require('bcryptjs');

const app = express();
const config = require('../config');

// CORS configuration
app.use(cors(config.api.cors));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize database connection
const { sequelize } = require('../db/models');

// Authentication Routes
app.post('/api/auth', async (req, res) => {
    try {
        const { type, name, email, password, country, currency } = req.body;

        if (type === 'signup') {
            const existing = await User.findOne({ where: { email } });
            if (existing) return res.status(400).json({ error: 'User already exists' });

            const company = await Company.create({
                name: `${name}'s Company`,
                country,
                currency
            });

            const hash = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                email,
                password: hash,
                role: 'Admin',
                companyId: company.id
            });

            return res.status(200).json({ user, company });
        }
        else if (type === 'login') {
            const user = await User.findOne({
                where: { email },
                include: [{ model: Company }]
            });

            if (!user) return res.status(404).json({ error: 'User not found' });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(401).json({ error: 'Invalid password' });

            // Remove password from response
            const { password: _, ...userWithoutPassword } = user.toJSON();
            return res.status(200).json({ user: userWithoutPassword });
        }

        res.status(405).json({ error: 'Invalid request type' });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Company }],
            attributes: { exclude: ['password'] }
        });
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password, role, companyId } = req.body;
        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hash,
            role,
            companyId
        });

        const { password: _, ...userWithoutPassword } = user.toJSON();
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Expense Routes
app.get('/api/expenses', async (req, res) => {
    try {
        const { userId, status } = req.query;
        const where = {};

        if (userId) where.userId = userId;
        if (status) where.status = status;

        const expenses = await Expense.findAll({
            where,
            include: [
                { model: User, attributes: ['id', 'name', 'email'] },
                { model: ApprovalWorkflow, include: [{ model: User, as: 'Approver', attributes: ['id', 'name'] }] }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json(expenses);
    } catch (error) {
        console.error('Get expenses error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/expenses', async (req, res) => {
    try {
        const { amount, currency, category, description, date, userId } = req.body;

        const expense = await Expense.create({
            amount,
            currency,
            category,
            description,
            date,
            userId,
            status: 'Pending'
        });

        // Create approval workflow based on company rules
        await createApprovalWorkflow(expense);

        res.status(201).json(expense);
    } catch (error) {
        console.error('Create expense error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const expense = await Expense.findByPk(id);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });

        await expense.update(updates);

        // Log status change
        if (updates.status) {
            await ExpenseHistory.create({
                expenseId: id,
                status: updates.status,
                changedBy: updates.changedBy || expense.userId,
                comment: updates.comment
            });
        }

        res.json(expense);
    } catch (error) {
        console.error('Update expense error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Approval Routes
app.get('/api/approvals', async (req, res) => {
    try {
        const { approverId } = req.query;

        const approvals = await ApprovalWorkflow.findAll({
            where: { approverId, status: 'Pending' },
            include: [
                { model: Expense, include: [{ model: User, attributes: ['id', 'name', 'email'] }] },
                { model: User, as: 'Approver', attributes: ['id', 'name'] }
            ],
            order: [['createdAt', 'ASC']]
        });

        res.json(approvals);
    } catch (error) {
        console.error('Get approvals error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/approvals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status, comment } = req.body;

        const approval = await ApprovalWorkflow.findByPk(id);
        if (!approval) return res.status(404).json({ error: 'Approval not found' });

        await approval.update({ status, comment });

        // Update expense status if all approvals are complete
        await updateExpenseStatus(approval.expenseId);

        res.json(approval);
    } catch (error) {
        console.error('Update approval error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Company Routes
app.get('/api/companies', async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.json(companies);
    } catch (error) {
        console.error('Get companies error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Approval Rule Routes
app.get('/api/approval-rules', async (req, res) => {
    try {
        const { companyId } = req.query;
        const rules = await ApprovalRule.findAll({ where: { companyId } });
        res.json(rules);
    } catch (error) {
        console.error('Get approval rules error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/approval-rules', async (req, res) => {
    try {
        const { type, value, companyId } = req.body;
        const rule = await ApprovalRule.create({ type, value, companyId });
        res.status(201).json(rule);
    } catch (error) {
        console.error('Create approval rule error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Helper Functions
async function createApprovalWorkflow(expense) {
    try {
        const user = await User.findByPk(expense.userId, { include: [Company] });
        const company = user.Company;

        // Get approval rules for the company
        const rules = await ApprovalRule.findAll({ where: { companyId: company.id } });

        if (rules.length === 0) {
            // Default rule: Manager approval
            const manager = await User.findOne({
                where: { companyId: company.id, role: 'Manager' }
            });

            if (manager) {
                await ApprovalWorkflow.create({
                    expenseId: expense.id,
                    approverId: manager.id,
                    sequence: 1,
                    isManagerApprover: true
                });
            }
        } else {
            // Implement rule-based approval workflow
            for (let i = 0; i < rules.length; i++) {
                const rule = rules[i];
                let approverId = null;

                if (rule.type === 'SpecificApprover') {
                    const approver = await User.findOne({
                        where: { companyId: company.id, role: rule.value }
                    });
                    approverId = approver?.id;
                } else if (rule.type === 'Percentage') {
                    const manager = await User.findOne({
                        where: { companyId: company.id, role: 'Manager' }
                    });
                    approverId = manager?.id;
                }

                if (approverId) {
                    await ApprovalWorkflow.create({
                        expenseId: expense.id,
                        approverId,
                        sequence: i + 1,
                        isManagerApprover: rule.type === 'Percentage'
                    });
                }
            }
        }
    } catch (error) {
        console.error('Create approval workflow error:', error);
    }
}

async function updateExpenseStatus(expenseId) {
    try {
        const workflows = await ApprovalWorkflow.findAll({
            where: { expenseId },
            order: [['sequence', 'ASC']]
        });

        const expense = await Expense.findByPk(expenseId);

        // Check if all workflows are approved
        const allApproved = workflows.every(w => w.status === 'Approved');
        const anyRejected = workflows.some(w => w.status === 'Rejected');

        if (anyRejected) {
            await expense.update({ status: 'Rejected' });
        } else if (allApproved) {
            await expense.update({ status: 'Approved' });
        }
    } catch (error) {
        console.error('Update expense status error:', error);
    }
}

// Initialize database and start server
async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');

        // Sync database (create tables if they don't exist)
        await sequelize.sync({ force: false });
        console.log('Database synchronized.');

        const PORT = config.api.port;
        app.listen(PORT, () => {
            console.log(`🚀 Backend API running on port ${PORT}`);
            console.log(`📊 Environment: ${config.app.environment}`);
            console.log(`🗄️  Database: ${config.database.name}@${config.database.host}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
}

startServer();
