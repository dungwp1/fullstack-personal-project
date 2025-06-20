'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Products.belongsTo(models.Brands, {
                foreignKey: 'brandId',
                as: 'brand'
            });
        }
    }
    Products.init({
        name: DataTypes.STRING,
        brandId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};