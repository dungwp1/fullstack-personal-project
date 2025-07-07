'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            brandId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            deviceId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            note: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Items');
    }
};
