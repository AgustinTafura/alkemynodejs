const { Op, Sequelize } = require("sequelize");
const {User}  = require('../models/index');


module.exports = {

  createUser:  async (req, res, next) => {
    const { email, password } = req.body
    
    encryptPassword = await helpers.encryptPassword(password);

    await User.create({email,password:encryptPassword})
    .then(user=>{
      const client = new SMTPClient({
        user: 'user',
        password: 'password',
        host: 'smtp.your-email.com',
        ssl: true,
      });
    })
    .catch(err=>res.status(400).send(err))
    // const newToken = generateAccessToken(user.id)
  
  }
}
