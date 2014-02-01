var btcaddressRepository = function(dalObj){
	this.dal = dalObj;
	
}

btcaddressRepository.prototype = function(){};

btcaddressRepository.prototype.insert = function(m,callback){
	this.dal.query({
		text: " \
			INSERT INTO btcaddress (public) \
			VALUES ($1); \
		",
		values: [m.public]
	},callback);
}

btcaddressRepository.prototype.updateWithSession = function(m,callback){
	this.dal.query({
		text: " \
			UPDATE btcaddress SET btcsessionid = $1  \
			WHERE id IN (SELECT id \
			FROM btcaddress WHERE btcsessionid IS NULL ORDER BY id ASC LIMIT 1) \
			RETURNING *; \
		",
		values: [m.btcsessionid]
	},
	function(err, result){
		if (err){
			callback(err);
		}
		else{
			//console.log(result);
			callback(null,result.rows[0])
		}
	});
}
/*
btcaddressRepository.prototype.insert = function(m,callback){
	dal.query({
		text: " \
			INSERT INTO btcaddress (addresspublic) \
			VALUES ($1) \
		",
		values: [m.public]
	},callback);
}

addressbtcRepository.prototype.getNew = function(callback){
	var queryStr = "";
	queryStr += "UPDATE addressbtc SET assigned = true ";
	queryStr += "WHERE CTID IN (SELECT CTID FROM addressbtc WHERE assigned = false LIMIT 1) RETURNING *;";
	this.dal.query(queryStr,function(err,result){
		if (err) {return callback(err)}
		else {
			if (result.rowCount == 0){
				err="No addresses available.";
			}
			callback(err,result);
		}
	});
};

addressbtcRepository.prototype.insert = function(address,callback){
	var queryStr = "";
	queryStr += "INSERT INTO addressbtc (datetimecreated, addresspublic, assigned) ";
	queryStr += "VALUES (CURRENT_TIMESTAMP,'" + address +"', false);";
	this.dal.query(queryStr,callback);
};	


gameactionspinRepository.prototype.insert = function(m,callback){
	var queryStr = " \
		INSERT INTO gameactionspin (sid, datetimecreated, gtype, bonusid, bet, lines, generalrate, specialarate, specialbrate, \
		generalin, generalout, specialain, specialbin, remainder) \
		VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING * \
	"

	var vals = [m.sid, m.gtype, m.bonusid, m.bet, m.lines, m.generalrate, m.specialarate, m.specialbrate, m.generalin, m.generalout, m.specialain, m.specialbin, m.remainder];
	
	this.dal.query({text: queryStr, values: vals},callback);

};


addressbtcRepository.prototype.getNew = function(callback){
	var queryStr = "";
	queryStr += "UPDATE addressbtc SET assigned = true ";
	queryStr += "WHERE CTID IN (SELECT CTID FROM addressbtc WHERE assigned = false LIMIT 1) RETURNING *;";
	this.dal.query(queryStr,function(err,result){
		if (err) {return callback(err)}
		else {
			if (result.rowCount == 0){
				err="No addresses available.";
			}
			callback(err,result);
		}
	});
};

addressbtcRepository.prototype.insert = function(address,callback){
	var queryStr = "";
	queryStr += "INSERT INTO addressbtc (datetimecreated, addresspublic, assigned) ";
	queryStr += "VALUES (CURRENT_TIMESTAMP,'" + address +"', false);";
	this.dal.query(queryStr,callback);
};	
*/
module.exports = function (dal) { 
	return new btcaddressRepository(dal);
};
