gUtility = function (){
	var uuid = require('node-uuid');

	this.generateUUID = function(){
		return uuid.v4();
	};
};

module.exports = function(){
	return new gUtility();
};