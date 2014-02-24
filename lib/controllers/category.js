'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    Category = sequelize.Category;

exports.create = function(req, res) {
  Category.create({
    name: req.body.name,
  })
  .success(function(participant){
    res.json(200,participant);
  })
  .error(function(errors){
    res.send(403, "Error creating category.");
  })
};

exports.findByName = function(req, res) {
  Category.find({ where: {name: req.body.name }})
  .success(function(category){
    res.json(200, category);
  })
  .error(function(errors){
    res.send(403, "Unable to find category.");
  })
};

