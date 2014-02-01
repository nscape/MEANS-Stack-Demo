'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    async = require('async');

exports.register = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    role: "user"
  });

  user.save(function(err){
    if (err) {
      res.send(403, "Error registering user.")
    } else {
      res.json(200, {
        username: user.username,
        role: user.role
      });
    }
  });
};

exports.login = function(req, res) {
  passport.authenticate('local', function(err, user){
    if (err) { return res.send(404) }
    if (!user) { return res.send(400) }
    res.json(200, {
      username: user.username,
      role: user.role
    });
  })(req, res);
};