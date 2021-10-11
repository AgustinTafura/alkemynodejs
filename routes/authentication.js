const express = require('express');
const router = express.Router();

const { createUser, getUser } = require("../controllers/authController")

const passport = require('passport');
const {generateAccessToken} = require('../lib/jwt'); //helper JWT
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


//Register
router.get('/register', (req, res, next) => {

  
  res.json({auth: 'register'})
})

router.route('/register')
  .post(createUser)


//Login
router.get('/login', (req, res, next) => {
  res.json({auth: 'login'})

})

router.post('/login',passport.authenticate('local.singin',{failureRedirect: '/login'}), (req, res, next) => {
  var redirectTo = req.session.redirectTo || '/';

  var userId = req.user.dataValues.id
  var token = generateAccessToken(userId);
  res.cookie('jwt', token).redirect(redirectTo) //token should be sotored in memory (frontend) and then use it in header requests
  delete req.session.redirectTo
})


//Logout
router.post('/logout', (req, res)=>{
  req.logout();
  delete req.session.redirectTo
  res.redirect('/login');
});



//Token
router.get('/token', isLoggedIn, (req, res, next)=>{
    const user = req.user

    //Refresh Token
    const newToken = generateAccessToken(user.id)
    newToken && res.cookie('jwt', newToken)
    
});


module.exports = router;
