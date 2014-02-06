'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event', {
    title: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    category: {
      type: DataTypes.INTEGER,
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
    	values: ['scheduled','live','cancelled','finished'],
  		allowNull: false,
      defaultValue: 'scheduled'
  	}
  })
}