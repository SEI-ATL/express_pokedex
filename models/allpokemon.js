'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allPokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.allPokemon.belongsTo(models.pokemon, { as: 'pokemonId' })
    }
  };
  allPokemon.init({
    name: DataTypes.STRING,
    sprite: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'allPokemon',
  });
  return allPokemon;
};