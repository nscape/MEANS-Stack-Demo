'use strict';

module.exports = function(sequelize, DataTypes) {
  var Participant = sequelize.define('Participant', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    tag: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models){
        Participant
        	/*.hasMany(models.Event, { foreignKey: 'ParticipantId', through: models.EventParticipant })*/
          .hasMany(models.EventParticipant)
      }
    }
  })

  return Participant;
}