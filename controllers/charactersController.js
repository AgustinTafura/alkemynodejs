const { Op, Sequelize } = require("sequelize");
const {Movie, Character, Director, Genre}  = require('../models/index');

module.exports = {

  getAllCharacters :  async(req, res, next) => {

    const { id } = req.params
    const whereStatement = {};

    if(id !== undefined){ whereStatement.id = id}

    try {
      const characters = await Character.findAll({
        where: whereStatement,
        // attributes: ['name', 'image']
        // include: {all: true},
      })
      return res.status(201).json({characters:characters});

    } catch (error) {
      console.log(error)
      return res.status(500).json({errors: error.message})
    }
  },

  getCharacter : async (req, res) => {
    const {id} = req.params
    await Character.findOne({where:{id}})
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
