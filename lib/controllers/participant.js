'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    Participant = sequelize.Participant;

exports.create = function(req, res) {
  Participant.create({
    name: req.body.name,
    tag: req.body.tag
  })
  .success(function(participant){
    res.json(200,participant);
  })
  .error(function(errors){
    res.send(403, "Error creating participant.");
  })
};


