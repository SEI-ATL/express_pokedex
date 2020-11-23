'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class pokemon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    pokemon.init({
        //best to add validations in model over controller
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'pokemon',
    });
    return pokemon;
};