const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController")

const passport = require('passport');
const {generateAccessToken} = require('../lib/jwt'); //helper JWT
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');


//Register

router.route('/register')
  .post(registerUser)


//Login
router.route('/login')
  .post(loginUser)


module.exports = router;
