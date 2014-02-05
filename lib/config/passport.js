'use strict';

var	passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , sequelize = require('../db/sequelize')
    , user = sequelize.user;


passport.use(new LocalStrategy(
  function(username, password, done) {
    user.find({ where: {username: username }})
    .success(function(user) {
      console.log(user)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
    .error(function(err){
      if (err) { return done(err); }
    })
  }
));

/** 
 * Passport serialize/deserialize logic
 */

passport.serializeUser = function(user, done){
  done(null, user.id);
};

passport.deserializeUser = function(id, done){
  user.find(id)
  .success(function(user){
    if (user){ done(null, user); }
    else{ done(null, false );}
    
  	
  })
  .error(function(err){
    done(err);
  })
};
