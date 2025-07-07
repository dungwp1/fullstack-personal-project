'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ItemImages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ItemImages.belongsTo(models.Items, {
                foreignKey: 'itemId',
                as: 'item'
            });
        }
    }
    ItemImages.init({
        itemId: DataTypes.INTEGER,
        imageUrl: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ItemImages',
    });
    return ItemImages;
};