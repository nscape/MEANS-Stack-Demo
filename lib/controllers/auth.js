'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    User = sequelize.User;

exports.register = function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'user'
  })
  .success(function(User){
    res.json(200, {
      username: User.username,
      role: User.role
    });
  })
  .error(function(errors){
    res.send(403, "Error registering user.");
  })
};

exports.registerModerator = function(req, res) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'moderator'
  })
  .success(function(User){
    res.json(200, {
      username: User.username,
      role: User.role
    });
  })
  .error(function(errors){
    res.send(403, "Error registering moderator.");
  })
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user){
    if (err) { 
      return res.send(404);
    }
    if (!user) { return res.send(401) }

    req.logIn(user, function(err){
      if (err){
        return next(err);
      }

      res.send(200, {
        username: user.username,
        role: user.role
      });
    })
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.send(200);
};