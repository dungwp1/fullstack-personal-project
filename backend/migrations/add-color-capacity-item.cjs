'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Items', 'colorId', {
            type: Sequelize.INTEGER,
            allowNull: true, // hoặc true nếu cho phép null
        });

        await queryInterface.addColumn('Items', 'ramId', {
            type: Sequelize.INTEGER,
            allowNull: true, // hoặc true nếu cho phép null
        });

        await queryInterface.addColumn('Items', 'capacityId', {
            type: Sequelize.INTEGER,
            allowNull: true, // hoặc true nếu cho phép null
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Items', 'colorId');
        await queryInterface.removeColumn('Items', 'ramId');
        await queryInterface.removeColumn('Items', 'capacityId');
    }
};
