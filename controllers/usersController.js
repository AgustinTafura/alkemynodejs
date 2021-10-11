const { Op, Sequelize } = require("sequelize");
const {User}  = require('../models/index');
const {sendEmail} = require('../lib/sendgrid')
const {generateAccessToken} = require('../lib/jwt')
const helpers = require('../lib/helpers')

module.exports = {

  getAllUsers :  async(req, res, next) => {

    try {
      const users = await User.findAll({
        attributes: ['email'],
      })
      return res.status(201).json({users});

    } catch (error) {
      return res.status(500).json({errors: error.message})
    }
  },

  getUser : async (req, res) => {
    const {id} = req.params
    await User.findOne({
      where:{id},
    })
    .then(user=>res.json(user))
    .catch(err=>res.status(400).send(err))
  },

  addUser : async (req, res) => {
    
    try {
      const {  email, password } = req.body;
  
      // Validate
      if (!(email && password)) {
        res.status(400).send("email and password are required");
      }

      const oldUser = await User.findOne({ where:{email} });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }

      encryptPassword = await helpers.encryptPassword(password);

      await User.create({
        email: email.toLowerCase(),
        password:encryptPassword}
      )
      .then(async user=>{
        const token = await generateAccessToken(user.id)

        // save user token
        user.dataValues.token = token
        //sent welcome email 
        sendEmail('agustintafura@gmail.com', 'REGISTER COMPLETE', 'WELCOME! REGISTER COMPLETE')
        res.json(user);
      })
      .catch(err=>res.status(400).send(err))

    } catch (err) {
      console.log(err);
    }
  },

  updateUser : async (req, res) => {
    const {id} = req.params
    const { email, password } = req.body
  
    // Validate
    if (!(email && password)) {
      res.status(400).send("email and password are required");
    }
    encryptPassword = await helpers.encryptPassword(password);

    await User.update({email, password:encryptPassword}, {where:{id}})
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },

  removeUser : async (req, res) => {
    const { id } = req.params

    await User.destroy({ where: {id} })
    .then(()=>res.sendStatus(204))
    .catch(err=>res.status(400).send(err))
  },


}
