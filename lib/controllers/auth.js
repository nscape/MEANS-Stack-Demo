'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    user = sequelize.user;

exports.register = function(req, res) {
  user.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: 'user'
  })
  .success(function(user){
    res.json(200, {
      username: user.username,
      role: user.role
    });
  })
  .error(function(errors){
    res.send(403, "Error registering user.");
  })
};

exports.login = function(req, res) {
  passport.authenticate('local', function(err, user){
    if (err) { return res.send(404) }
    if (!user) { return res.send(400) }
    
  })(req, res);
};