const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Company = sequelize.define('Company', {
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
});

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Admin', 'Manager', 'Employee'), allowNull: false },
    companyId: { type: DataTypes.INTEGER, allowNull: false },
});

const EmployeeManager = sequelize.define('EmployeeManager', {
    employeeId: { type: DataTypes.INTEGER, allowNull: false },
    managerId: { type: DataTypes.INTEGER, allowNull: false },
});

const Expense = sequelize.define('Expense', {
    amount: { type: DataTypes.FLOAT, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
    userId: { type: DataTypes.INTEGER, allowNull: false },
});

const ApprovalWorkflow = sequelize.define('ApprovalWorkflow', {
    sequence: { type: DataTypes.INTEGER, allowNull: false },
    approverId: { type: DataTypes.INTEGER, allowNull: false },
    expenseId: { type: DataTypes.INTEGER, allowNull: false },
    isManagerApprover: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
    comment: { type: DataTypes.TEXT },
});

const ApprovalRule = sequelize.define('ApprovalRule', {
    type: { type: DataTypes.ENUM('Percentage', 'SpecificApprover', 'Hybrid'), allowNull: false },
    value: { type: DataTypes.STRING }, // e.g., '60', 'CFO', '60|CFO'
    companyId: { type: DataTypes.INTEGER, allowNull: false },
});

const ExpenseHistory = sequelize.define('ExpenseHistory', {
    expenseId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), allowNull: false },
    changedBy: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT },
    changedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

// Associations
Company.hasMany(User, { foreignKey: 'companyId' });
User.belongsTo(Company, { foreignKey: 'companyId' });
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });
Expense.hasMany(ApprovalWorkflow, { foreignKey: 'expenseId' });
ApprovalWorkflow.belongsTo(Expense, { foreignKey: 'expenseId' });
ApprovalWorkflow.belongsTo(User, { as: 'Approver', foreignKey: 'approverId' });
ApprovalRule.belongsTo(Company, { foreignKey: 'companyId' });
Expense.hasMany(ExpenseHistory, { foreignKey: 'expenseId' });
ExpenseHistory.belongsTo(Expense, { foreignKey: 'expenseId' });
ExpenseHistory.belongsTo(User, { foreignKey: 'changedBy' });

module.exports = {
    sequelize,
    Company,
    User,
    EmployeeManager,
    Expense,
    ApprovalWorkflow,
    ApprovalRule,
    ExpenseHistory,
};
