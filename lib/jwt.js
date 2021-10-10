const jwt = require('jsonwebtoken');

module.exports = {

  generateAccessToken(userId) {
    const token = jwt.sign({userId},process.env.SECRET_TOKEN , { expiresIn: '300' })

    return token
  },

  authenticateToken(req, res, next) {
    const token = req.cookies['jwt'] //should be in req.header
    const user = req.user
    console.log(req);
    if (token == null) return res.status(401).json(token)

    jwt.verify(token , process.env.SECRET_TOKEN, (err) => {
      //Error handling
      if(err){

        err.name !== 'TokenExpiredError' && res.redirect('/login');
        
        if(err.name === 'TokenExpiredError') {

          // if Token exired > 10days ==> login
          const expiredDate = new Date(err.expiredAt)
          const limitDate = new Date(expiredDate.getTime()+(10*24*60*60*1000))
          const today = new Date()

          if(limitDate < today){
            req.logout();
            res.redirect('/login');
          } 

          //Refresh Token
          const newToken = module.exports.generateAccessToken(user.id)
          newToken && res.cookie('jwt', newToken)
        }
      }
    })


      next()
  },

}
