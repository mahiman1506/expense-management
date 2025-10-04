// Migration for ExpenseHistory table
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ExpenseHistories', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            expenseId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Expenses', key: 'id' } },
            status: { type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'), allowNull: false },
            changedBy: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
            comment: { type: Sequelize.TEXT },
            changedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ExpenseHistories');
    }
};
