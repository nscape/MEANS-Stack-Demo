var usersRepository = function(dalObj){
	this.dal = dalObj;
	
}

usersRepository.prototype = function(){};

usersRepository.prototype.insert = function(m,callback){
	this.dal.query({
		text: " \
			WITH i AS ( SELECT id  FROM userrole WHERE role = $4 \
			) \
			INSERT INTO users (username,password,email,roleid) SELECT $1, $2, $3, id FROM i \
		",
		values: [m.username, m.password, m.email, m.role]
	},function(err, result){
		if (err){
			//console.log(err);
			callback(err);
		}
		else{
			//console.log(result);
			callback(null)
		}
	});
}

module.exports = function (dal) { 
	return new usersRepository(dal);
};
