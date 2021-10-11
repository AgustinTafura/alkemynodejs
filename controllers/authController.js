const { Op, Sequelize } = require("sequelize");
const {User}  = require('../models/index');
const {sendEmail} = require('../lib/sendgrid')
const {generateAccessToken} = require('../lib/jwt')
const helpers = require('../lib/helpers')


module.exports = {

  registerUser:  async (req, res, next) => {
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

        // save user token
        user.dataValues.token = token
        //sent welcome email 
        sendEmail('agustintafura@gmail.com', 'REGISTER COMPLETE', 'WELCOME! REGISTER COMPLETE')
        res.json(user);
      })
      .catch(err=>{console.log(111, err);res.status(400).send(err)})

    } catch (err) {
      console.log(444, err);
    }
  },

  loginUser: async (req, res)=>{
    try {
      const { email, password } = req.body;
  
      // Validate
      if (!(email && password)) {
        res.status(400).send("email and password are required");
      }

      // Validate if user exist in our database
      const user = await User.findOne({ where:{email} });
  
      if (user && (await helpers.matchPassword(password, user.password))) {

        const token = await generateAccessToken(user.id)
        

        // save user token
        user.dataValues.token = token;

        return res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  }


}

