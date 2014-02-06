'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wager', {
    userid: {
    	type: DataTypes.DECIMAL(18,8),
    	allowNull: false
    },
    wager: {
    	type: DataTypes.DECIMAL(18,8),
    	allowNull: false
    },
    eventparticipantid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
	})
}