// Migration for ApprovalWorkflow table
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ApprovalWorkflows', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            sequence: { type: Sequelize.INTEGER, allowNull: false },
            approverId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
            expenseId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Expenses', key: 'id' } },
            isManagerApprover: { type: Sequelize.BOOLEAN, defaultValue: false },
            status: { type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
            comment: { type: Sequelize.TEXT },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ApprovalWorkflows');
    }
};
