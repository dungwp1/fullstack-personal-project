'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Capacities extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Capacities.hasMany(models.Items, {
                foreignKey: 'capacityId',
                as: 'items'
            });
        }
    }
    Capacities.init({
        capacity: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Capacities',
    });
    return Capacities;
};