'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participant', {
    name: {
    	type: DataTypes.STRING,
    	allowNull: false
    },
    organizationid: {
      type: DataTypes.INTEGER
    }
  })
}