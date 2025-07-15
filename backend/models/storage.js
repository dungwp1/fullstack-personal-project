'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Storages extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Storages.hasMany(models.Items, {
                foreignKey: 'capacityId',
                as: 'items'
            });
        }
    }
    Storages.init({
        storage: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Storages',
    });
    return Storages;
};