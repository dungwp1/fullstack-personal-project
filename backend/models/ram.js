'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ram extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Ram.hasMany(models.Items, {
                foreignKey: 'ramId',
                as: 'items'
            });
        }
    }
    Ram.init({
        ram: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Ram',
    });
    return Ram;
};