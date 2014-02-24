'use strict';

module.exports = function(sequelize, DataTypes) {
  var Currency = sequelize.define('Currency', {
    code: {
    	type: DataTypes.STRING(10),
    	allowNull: false
    },
    description: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
	}, {
    classMethods: {
      associate: function(models){
        Currency
          .hasMany(models.Account)
      }
    }
  })
  return Currency;
}