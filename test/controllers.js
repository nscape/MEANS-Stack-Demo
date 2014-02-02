var expect = require('chai').expect
var sequelize = require('../lib/db/sequelize')
var AuthCtrl = require('../lib/controllers/auth')

describe('controller unit tests', function(){

	var req = {}
		, res = {}
		, next = {}

	//sync db
	before(function(done){
		this.timeout(10000);
		sequelize
		.sequelize
		.sync({force:true})
		.complete(function(){
			done();
		})
	})

	describe('auth controller', function(){
		describe('#register()', function(){
			
			beforeEach(function(){
				req.body = {
					username: 'testuser',
					password: 'testpassword',
					email: 'test@test.test'
				}
			});

			it('should return a 200 since its a new user', function(done) {

        res.json = res.send = function(httpStatus) {
            expect(httpStatus).to.equal(200);
            done();
        };

        AuthCtrl.register(req, res, next);
      });

			it('should return a 403 since user already exists', function(done) {

        res.json = res.send = function(httpStatus) {
            expect(httpStatus).to.equal(403);
            done();
        };

        AuthCtrl.register(req, res, next);
      });

		})
	})
})

