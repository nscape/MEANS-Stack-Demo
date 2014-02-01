services = function(app){
	this.payment = require('./paymentService.js')(app);
};

module.exports = function(app) { 
	return new services(app);
};