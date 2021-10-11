const jwt = require('jsonwebtoken');

module.exports = {

  generateAccessToken(userId) {
    const token = jwt.sign({userId},process.env.SECRET_TOKEN , { expiresIn: '24h' })

    return token
  },

}
