const { Op, Sequelize } = require("sequelize");
const {Movie, Character, Genre}  = require('../models/index');

module.exports = {

  getAllMovies :  async(req, res, next) => {

    const { title, genre, order  } = req.query
    const whereStatement = {};
    var filterStatement = [];
    const whereGenreStatement = {};

    if(title !== undefined){ whereStatement.title = title}
    if(order !== undefined){ filterStatement.push(['releaseDate', order])}
    if(genre !== undefined){ whereStatement.id = genre}

    try {
      const movies = await Movie.findAll({
        where: whereStatement,
        attributes: ['title', 'image', 'releaseDate'],
        order: filterStatement, // order by releaseDate
        include: {
          model: Genre,
          where: whereStatement.id
        },
      })
      return res.status(201).json({movies});

    } catch (error) {
      return res.status(500).json({errors: error.message})
    }
  },

  getMovie : async (req, res) => {
    const {id} = req.params
    await Movie.findOne({
      where:{id},
      // include: {all: true},
    })
    .then(movie=>res.json(movie))
    .catch(err=>res.status(400).send(err))
  },

  createMovie : async (req, res) => {
    const {title, image, qualification, releaseDate, genreId} = req.body

    await Movie.create({title, image, qualification, releaseDate, genreId})
    .then(movie=>res.json(movie))
    .catch(err=>res.status(400).send(err))
  },

  updateMovie : async (req, res) => {
    const {id} = req.params
    const {title, image, qualification, releaseDate, genreId} = req.body
    await Movie.update({title, image, qualification, releaseDate, genreId}, {where:{id}})
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },

  removeMovie : async (req, res) => {
    const { id } = req.params

    await Movie.destroy({ where: {id} })
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },


}
