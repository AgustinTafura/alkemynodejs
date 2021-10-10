const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('./helpers');  //encript pass
const {User}  = require('../models/index');


//user login
passport.use('local.singin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done ) => {


  const user = await User.findOne({ where: { email: email }, include: [{all: true}]});

  if(user) {
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword){
      req.session.errors = null;
      req.session.dataForm = null;
      done(null, user);
    } else {
      req.session.errors = {password: 'invalid password'};
      req.session.dataForm = {email: email};
      
      done(null, false);
    }
  } else {
    req.session.errors = {email: 'the email does not exist'};
    done(null, false);
  }

}))


//user register
passport.use('local.singup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done ) => {

  encryptPassword = await helpers.encryptPassword(password);


  await User.sync().then(function () {

    return User.create({

      email: email,
      password: encryptPassword,
      created_at: new Date(),
      updated_at: new Date(),


    }).then(function(newUser){
      req.session.errors = null;
      req.session.dataForm = null;


      return done(null, newUser);
    }).catch(function(err){
      const errors = err.errors;
      req.session.errors = {}
      req.session.dataForm = {email}
      console.log(err)
      for(var key in errors){
        for (item in req.body) {
          if(item === errors[key].path){
              req.session.errors[item] = errors[key].message;
          }
        }

      }
      done(null, false);
    });


  })
}))


passport.serializeUser( (req, user, done)=>{

  return done(null, user.id);
})


passport.deserializeUser( async (id, done)=>{

  const row = await User.findOne({ where: { id }, include: [{all: true}]})
  const user = row.dataValues
  user.password = null // remove pass
  return done(null, user);
})
