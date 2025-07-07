'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Devices extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Devices.belongsTo(models.Brands, {
                foreignKey: 'brandId',
                as: 'brand'
            });
            Devices.hasMany(models.Items, {
                foreignKey: 'deviceId',
                as: 'items'
            });
        }
    }
    Devices.init({
        name: DataTypes.STRING,
        brandId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Devices',
    });
    return Devices;
};