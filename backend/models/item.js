'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Items extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Items.belongsTo(models.Categories, {
                foreignKey: 'categoryId',
                as: 'category'
            });
            Items.belongsTo(models.Brands, {
                foreignKey: 'brandId',
                as: 'brand'
            });
            Items.belongsTo(models.Devices, {
                foreignKey: 'deviceId',
                as: 'device'
            });
            Items.hasMany(models.ItemImages, {
                foreignKey: 'itemId',
                as: 'images'
            });
        }
    }
    Items.init({
        categoryId: DataTypes.INTEGER,
        brandId: DataTypes.INTEGER,
        deviceId: DataTypes.INTEGER,
        price: DataTypes.FLOAT,
        note: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Items',
    });
    return Items;
};