utilities = function(){
	this.g = require('./gUtility')();
};

module.exports = function(){
	return new utilities();
};