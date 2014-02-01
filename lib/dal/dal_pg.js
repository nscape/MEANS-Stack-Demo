
DAL_pg = function(dbConfig){
	this.pg = require('pg');
	//this.connStr= "pg://pitboss:12GetMoneyGetPaid12@localhost/bqdb";

	this.config = dbConfig;
	this.pg.defaults.poolSize = 10;
	//var session = require('./sessionRepository')(this);
	this.btcaddress = require('./btcaddressRepository')(this);
	this.users = require('./usersRepository')(this);
	//var gameactionspin = require('./gameactionspinRepository')(this);
	//var procedures = require('./procedures')(this);
};

DAL_pg.prototype.query = function(queryObj,callback) {

	this.pg.connect(this.config, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			console.error(err) //logs the errors for all queries
			callback(err);
			return true;
		};
		client.query(queryObj, function(err, result) {
			if(handleError(err)) {return;}
			

			done();
			//consol.log(result);
			callback(err,result);
		});
	});
};

DAL_pg.prototype.rollback = function(client, done) {
  client.query('ROLLBACK', function(err) {
    //if there was a problem rolling back the query
    //something is seriously messed up.  Return the error
    //to the done function to close & remove this client from
    //the pool.  If you leave a client in the pool with an unaborted
    //transaction __very bad things__ will happen.
    return done(err);
  });
};


module.exports = function (dbConfig) { 
	return new DAL_pg(dbConfig);
};

