var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require("body-parser");

var indexRouter = require('./routes/index');
var charactersRouter = require('./routes/characters');

var app = express();
require('./lib/passport');
require('dotenv').config()


//Middlewares
app.use(session({
    cookie: { maxAge: 86400000 },
    secret: 'challenge',
    resave: true,
    saveUninitialized: true,
  }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize()) // passport init
app.use(passport.session()) //passport session

// Routes
app.use('/', indexRouter);
app.use('/characters', charactersRouter);
// app.use('/users', usersRouter);
app.use(require('./routes/authentication'));

module.exports = app;
