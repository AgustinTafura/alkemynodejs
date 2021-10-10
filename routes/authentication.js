const express = require('express');
const router = express.Router();
const passport = require('passport');
const {generateAccessToken} = require('../lib/jwt'); //helper JWT
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


//Register
router.get('/register', isNotLoggedIn, (req, res, next) => {
  res.render('auth/register')
  req.session.errors = null;
  req.session.dataForm = null;
})

router.post('/register', isNotLoggedIn, (req, res, next) => {
  var redirectTo = req.session.redirectTo || '/';

  passport.authenticate('local.singup', {
      successRedirect: redirectTo,
      failureRedirect: '/register',
    })(req, res, next),

  delete req.session.redirectTo
});


//Login
router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('auth/login');
  req.session.errors = null;
  req.session.dataForm = null;
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
