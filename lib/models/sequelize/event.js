'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    beginsAt: {
    	type: DataTypes.DATE,
    	allowNull: false
    },
    endsAt: {
      type: DataTypes.DATE
    },
    state: {
    	type: DataTypes.ENUM,
    	values: ['staged','open','closed','cancelled','finished'],
  		allowNull: false,
      defaultValue: 'staged'
  	},
    hc: {
      type: DataTypes.DECIMAL(6,4),
      allowNull: false,
      defaultValue: 0.1
    }
  }, {
    classMethods: {
      associate: function(models){
        Event
          .belongsTo(models.User)
          .belongsTo(models.Category)
          /*.hasMany(models.Participant, { through: models.EventParticipant, foreignKey: 'EventId' })*/
          .hasMany(models.EventParticipant)
      }
    }
  })

  return Event;
}