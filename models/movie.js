'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Genre);
      this.belongsToMany(models.Character, { through: 'characters_movies' })
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    qualification: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
    genreId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
