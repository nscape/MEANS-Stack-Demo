var assert = require("assert")


var db = require('../db/database.json');
var dbconfig= db.development;

var dal = require('../lib/dal/dal_pg')(dbconfig)

describe('DAL', function(){
	describe('btcaddressRepository', function(){
		describe('#insert()', function(){
			it('should insert without error', function(done){
				dal.btcaddress.insert({
					public : Math.floor(Math.random()*10000000000000000001)
				},done);

			})
		})
		describe('#updateWithSession();', function(){
			it('should return a btcaddress object with an updated session', function(done){
				dal.btcaddress.updateWithSession({
					btcsessionid: Math.floor(Math.random()*1000001)
				},function(err,result){
					//console.log(err);
					//console.log(result);

					done();
				});

			})
		})
	})

	describe('userRepository', function(){
		describe('#insert()', function(){
			it('should insert without error', function(done){

				var rand = String(Math.floor(Math.random()*10000000000000000001))

				var user = function (){}
				user.username = "test"+rand;
				user.password = "123";
				user.email = "real@test"+rand;
				user.role = "member";
				

				dal.users.insert(user,done);

			})
		})
		
	})
})

