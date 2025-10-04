// Migration for Expense table
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Expenses', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            amount: { type: Sequelize.FLOAT, allowNull: false },
            currency: { type: Sequelize.STRING, allowNull: false },
            category: { type: Sequelize.STRING, allowNull: false },
            description: { type: Sequelize.TEXT },
            date: { type: Sequelize.DATE, allowNull: false },
            status: { type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' },
            userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' } },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Expenses');
    }
};
