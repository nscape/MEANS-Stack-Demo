'use strict';

var	passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../db/sequelize').sequelize


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.find({ where: {username: username }}).success(function(user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.authenticate(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/** 
 * Passport serialize/deserialize logic
 */

passport.serializeUser = function(user, done){
  done(null, user.id)
};

passport.deserializeUser = function(id, done){
  User.find(id).success(function(user){
  	done(err, user);
  });
};
