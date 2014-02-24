'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    EventParticipant = sequelize.EventParticipant,
    Event = sequelize.Event,
    Participant = sequelize.Participant;

exports.create = function(req, res) {
  EventParticipant
  .create({
  	EventId: req.body.EventId,
  	ParticipantId: req.body.ParticipantId,
    pocket: req.body.pocket
  })
  .success(function(eventparticipant){
    res.json(200,eventparticipant);
  })
  .error(function(errors){
    res.send(403, "Error creating EventParticipant.");
  })
};

exports.findById = function(req, res) {
  EventParticipant
  .find({ 
    where: { 
      EventId: req.body.EventId, 
      ParticipantId: req.body.ParticipantId
    },
    include: [Event, Participant]
  })
  .success(function(eventparticipant){
    res.json(200, eventparticipant);
  })
  .error(function(errors){
    res.send(403, "Unable to find EventParticipant.");
  })
};