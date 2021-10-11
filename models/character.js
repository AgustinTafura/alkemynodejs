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
      this.belongsToMany(models.Movie, { through: 'characters_movies', onDelete: 'cascade' })
    }
  };
  Character.init({
    name: { type: DataTypes.STRING, allowNull: false},
    image: { type: DataTypes.STRING, allowNull: false},
    age: { type: DataTypes.INTEGER, allowNull: false},
    weight: { type: DataTypes.INTEGER, allowNull: false},
    history: { type: DataTypes.STRING, allowNull: false}
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};