'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('eventparticipant', {
    eventid: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    },
    participantid: {
    	type: DataTypes.INTEGER,
    	allowNull: false
    }
	})
}