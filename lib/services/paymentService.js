paymentService = function(app) {
	this.app = app;
};

paymentService.prototype.getPaymentData = function(userModel,callback){

};

paymentService.prototype.getDepositInfo = function(userModel,callback){
	
};



paymentService.prototype.createNewBTCSession = function(userModel){

};



module.exports = function(app){
	return new paymentService(app);
};