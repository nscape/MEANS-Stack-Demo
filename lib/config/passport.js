'use strict';

var	passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    sequelize = require('sequelize').sequelize,


passport.use(new LocalStrategy(
  function(username, password, done) {
  	console.log("here")
    User.findOne({ username: username }, function (err, user) {
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
  done(null, user._id)
};

passport.deserializeUser = function(id, done){
  User.findById(id, function(err, user){
  	done(err, user);
  });
};
