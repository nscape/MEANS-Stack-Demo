'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    Wager = sequelize.Wager;


exports.create = function(req, res) {

  var payout = 10,
      amount = 5

  Wager
  .create({
    amount: req.body.amount, 
    payout: req.body.payout, 
    EventParticipantId: req.body.EventParticipantId
  })
  .success(function(wager){
    res.json(200,wager);
  })
  .error(function(errors){
    res.send(403, "Error creating wager.");
  })
};