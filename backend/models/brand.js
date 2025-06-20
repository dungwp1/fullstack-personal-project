'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brands extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Brands.belongsTo(models.Categories, {
                foreignKey: 'categoryId',
                as: 'category'
            });
            Brands.hasMany(models.Products, {
                foreignKey: 'brandId',
                as: 'products'
            });
        }
    }
    Brands.init({
        name: DataTypes.STRING,
        categoryId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Brands',
    });
    return Brands;
};