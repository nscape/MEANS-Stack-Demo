'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    username: {
    	type: DataTypes.STRING(20),
    	allowNull: false,
    	unique: true
    },
    email: {
    	type: DataTypes.STRING(254),
    	allowNull: false
    },
    password: {
    	type: DataTypes.STRING(50),
    	allowNull: false,
    	get: function(){
    		return this.getDataValue('password')
    	},
    	set: function(password){
    		this.salt = this.makeSalt();
    		this.setDataValue('password',this.encryptPassword(password));
    	}
    },
    salt: {
    	type: DataTypes.STRING(20),
		  allowNull: false
    },
    role: {
    	type: DataTypes.ENUM,
    	values:['user','moderator','admin'],
  		allowNull: false,
  		defaultValue: 'user'
  	}
  },    
  {
  	instanceMethods: {
  		authenticate: function(plainText) {
  			return this.encryptPassword(plainText) === this.password;
  		},
  		makeSalt: function() {
  			return Math.round((new Date().valueOf() * Math.random())) + '';
  		},
  		encryptPassword: function(password){
  			if (!password) return '';
        return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  		}
  	}
  })
}