'use strict';

module.exports = function(sequelize, DataTypes) {
  var Wager = sequelize.define('Wager', {
    amount: {
    	type: DataTypes.DECIMAL(18,8),
    	allowNull: false
    },
    payout: {
      type: DataTypes.DECIMAL(8,4),
      allowNull: false
    }
	}, {
    getterMethods:{
      amount: function(){
        return parseFloat(this.getDataValue('amount'))
      }
    },
    classMethods: {
      associate: function(models){
        Wager
          .belongsTo(models.Account)
          .belongsTo(models.EventParticipant)
      }
    }
  })

  return Wager;
}