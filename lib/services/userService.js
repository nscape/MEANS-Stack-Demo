userService = function(app) {
	this.app = app;
};

userService.prototype.create = function(userModel,callback){
	
};





module.exports = function(app){
	return new userService(app);
};

