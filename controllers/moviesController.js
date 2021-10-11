const { Op, Sequelize } = require("sequelize");
const {Movie, Character, Genre}  = require('../models/index');

module.exports = {

  getAllCharacters :  async(req, res, next) => {

    const { name, age, movies  } = req.query
    const whereStatement = {};
    const whereMovieStatement = {};

    if(name !== undefined){ whereStatement.name = name}
    if(age !== undefined){ whereStatement.age = age}
    if(movies !== undefined){ whereMovieStatement.id = movies}

    try {
      const characters = await Character.findAll({
        where: whereStatement,
        // attributes: ['name', 'image']
        include: {
          model: Movie,
          where: whereMovieStatement
        },
      })
      return res.status(201).json({characters:characters});

    } catch (error) {
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

  getCharacter : async (req, res) => {
    const {id} = req.params
    await Character.findOne({
      where:{id},
      include: {all: true},
    })
    .then(character=>res.json(character))
    .catch(err=>res.status(400).send(err))
  },

  createCharacter : async (req, res) => {
    const {name, image, age, weight, history} = req.body

    await Character.create({name, image, age, weight, history})
    .then(character=>res.json(character))
    .catch(err=>res.status(400).send(err))
  },

  updateCharacter : async (req, res) => {
    const {id} = req.params
    const {name, image, age, weight, history} = req.body
    console.log(name, image, age, weight, history)
    await Character.update({name, image, age, weight, history}, {where:{id}})
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },

  removeCharacter : async (req, res) => {
    const { id } = req.params

    await Character.destroy({ where: {id} })
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },


}
