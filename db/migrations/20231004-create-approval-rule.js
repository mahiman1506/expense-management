// Migration for ApprovalRule table
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ApprovalRules', {
            id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
            type: { type: Sequelize.ENUM('Percentage', 'SpecificApprover', 'Hybrid'), allowNull: false },
            value: { type: Sequelize.STRING }, // e.g., '60', 'CFO', '60|CFO'
            companyId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'Companies', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ApprovalRules');
    }
};
