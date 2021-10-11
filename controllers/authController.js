const { Op, Sequelize } = require("sequelize");
const {User}  = require('../models/index');
const sendEmail = require('../lib/sendgrid')
const {generateAccessToken} = require('../lib/jwt')
const helpers = require('../lib/helpers')


module.exports = {

  createUser:  async (req, res, next) => {
    const { email, password } = req.body
    
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
        user.dataValues.token = token
        //sent welcome email 
        sendEmail
        console.log('user', user)
        res.json(user);
      })
      .catch(err=>{console.log(111, err);res.status(400).send(err)})

    } catch (err) {
      console.log(444, err);
    }
  
  }
}

