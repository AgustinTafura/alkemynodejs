'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Movie, { through: 'characters_movies' })
    }
  };
  Character.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    age: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    history: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};