'use strict';

module.exports = function(sequelize, DataTypes) {
  var EventParticipant = sequelize.define('EventParticipant', {
    outcome: {
      type: DataTypes.ENUM,
      values: ['win','loss','undecided'],
      allowNull: false,
      defaultValue: 'undecided'
    }, 
    pocket: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: false,
      defaultValue: 0
    },
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ParticipantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
	}, {
    instanceMethods: {
      setPools: function(wagerPool, payoutPool, totalPool) {
        this.setDataValues('wagerPool') = wagerPool;
        this.setDataValues('payoutPool') = payoutPool;
      }
    },
    classMethods: {
      associate: function(models){
        EventParticipant
          .hasMany(models.Wager)
          .belongsTo(models.Event)
          .belongsTo(models.Participant)
      }
    }
  })
	
  return EventParticipant;
}