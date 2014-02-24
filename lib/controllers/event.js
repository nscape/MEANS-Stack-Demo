'use strict';

var passport = require('passport'),
    async = require('async'),
    sequelize = require('../db/sequelize'),
    Sequelize = require('sequelize'),
    Event = sequelize.Event,
    Category = sequelize.Category,
    Participant = sequelize.Participant,
    EventParticipant = sequelize.EventParticipant,
    Wager = sequelize.Wager;


exports.create = function(req, res) {
  Event
  .create(req.body)
  .success(function(event){
    res.json(200,event);
  })
  .error(function(errors){
    res.send(403, "Error creating event.");
  })
};

exports.getWithOdds = function(req, res){
  Event
  .find({
    where: {
      id: req.body.EventId
    },
    include: [
      {
        model: EventParticipant,
        include: [{ model: Participant }]
      },
      {
        model: Category
      }
    ]
  })
  .success(function(event){
    console.log(JSON.stringify(event))

    var chainer = new Sequelize.Utils.QueryChainer;
    //console.log('eventParticipant', event.eventParticipants)
    Sequelize.Utils._.each(event.eventParticipants, function(eventParticipant, index){
      //console.log(eventParticipant)
      chainer.add(Wager.findAll({
          attributes: [Sequelize.fn('SUM', Sequelize.col('amount'))],
          where: {

            EventParticipantId: eventParticipant.id 
          }
      }))
    })

    chainer.run()
    .success(function(results){
      console.log(JSON.stringify(results))
      res.json(200, event);
    })
    .error(function(err){
      console.log(err)
    })
    
    
  })
  .error(function(errors){
    console.log(errors)
    res.send(403, "Error creating event.");
  })
}


