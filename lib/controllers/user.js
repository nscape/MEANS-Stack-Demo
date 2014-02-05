'use strict';

var sequelize = require('../db/sequelize'),
    user = sequelize.user;

exports.index = function(req, res) {
  res.json(200, {
    username: req.user.username,
    role: req.user.role
  });
};