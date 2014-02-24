'use strict';

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    balance: {
    	type: DataTypes.DECIMAL(18,8),
    	allowNull: false
    }
	}, {
    classMethods: {
      associate: function(models){
        Account
          .belongsTo(models.Currency)
          .belongsTo(models.User)
      }
    }
  })

  return Account;
}