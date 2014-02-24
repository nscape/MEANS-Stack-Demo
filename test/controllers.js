var expect = require('chai').expect
var sequelize = require('../lib/db/sequelize')
var AuthCtrl = require('../lib/controllers/auth')
var CategoryCtrl = require('../lib/controllers/category')
var ParticipantCtrl = require('../lib/controllers/participant')
var EventCtrl = require('../lib/controllers/event')
var EventParticipantCtrl = require('../lib/controllers/eventparticipant')
var WagerCtrl = require('../lib/controllers/wager')

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

		describe('#registerModerator()', function(){
			
			beforeEach(function(){
				req.body = {
					username: 'testmod',
					password: 'testmod',
					email: 'mod@test.test'
				}
			});

			it('should return a 200 since its a new user', function(done) {

        res.json = res.send = function(httpStatus) {
          expect(httpStatus).to.equal(200);
          done();
        };

        AuthCtrl.registerModerator(req, res, next);
      });

			it('should return a 403 since user already exists', function(done) {

        res.json = res.send = function(httpStatus) {
          expect(httpStatus).to.equal(403);
          done();
        };

        AuthCtrl.registerModerator(req, res, next);
      });
		})
	})

	describe('category controller', function(){
		describe('#create()', function(){
			beforeEach(function(){
				req.body = {
					name: 'League of Legends'
				}
			});

			it('should return a 200', function(done) {
        res.json = res.send = function(httpStatus) {
          expect(httpStatus).to.equal(200);
          done();
        };
        CategoryCtrl.create(req, res, next);
      });
		})

		describe('#findByName()', function(){
			beforeEach(function(){
				req.body = {
					name: 'League of Legends'
				}
			});

			it('should return a 200', function(done) {
        res.json = res.send = function(httpStatus) {
          expect(httpStatus).to.equal(200);
          done();
        };
        CategoryCtrl.findByName(req, res, next);
      });

		})
	})

	describe('participant controller', function(){
		describe('#create()', function(){

			it('should return a 200, with the first participants data', function(done) {
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.name).to.equal('Counter Logic Gaming');
          done();
        };
        req = {body: {name: 'Counter Logic Gaming', tag: 'CLG'}}
        ParticipantCtrl.create(req, res, next);
      });

      it('should return a 200, with the second participants data', function(done) {
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.name).to.equal('Team Solo Mid');
          done();
        };
        req = {body: {name: 'Team Solo Mid', tag: 'TSM'}}
        ParticipantCtrl.create(req, res, next);
      });
		})
	})

	describe('event controller', function(){
		describe('#create()', function(){
			var tCategory;
			it('should return a 200, with the category', function(done) {
        req.body = {name: 'League of Legends'}
        res.json = res.send = function(httpStatus, data) {
        	tCategory = data;
          expect(httpStatus).to.equal(200);
          done();
        };
        CategoryCtrl.findByName(req, res, next);
      });

			it('should return a 200, with event data', function(done) {
        req.body = {
        	title: 'Counter Logic Gaming VS TSM', 
        	beginsAt: new Date(),
        	UserId: 2,
        	CategoryId: tCategory.id
      	}
      	res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.title).to.equal('Counter Logic Gaming VS TSM');
          expect(data.CategoryId).to.equal(tCategory.id);
          done();
        };
        
        EventCtrl.create(req, res, next);
      });
		})
	})

	describe('eventparticipant controller', function(){
		describe('#create()', function(){
			var tEventParticipant1
			it('should return a 200, with the first eventparticipant object', function(done) {
        req.body = {
        	ParticipantId: 1,
        	EventId: 1,
        	pocket: 0.5
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          tEventParticipant1 = data;
          done();
        };
        EventParticipantCtrl.create(req, res, next);
      });

			it('should return a 200, with the eventparticipant1 object and the associated participant/event', function(done) {
        req.body = {
        	EventId: tEventParticipant1.EventId,
        	ParticipantId: tEventParticipant1.ParticipantId
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.event.title).to.equal('Counter Logic Gaming VS TSM');
          expect(data.participant.name).to.equal('Counter Logic Gaming');
          done();
        };
        EventParticipantCtrl.findById(req, res, next);
      });

      var tEventParticipant2
			it('should return a 200, with the second eventparticipant object', function(done) {
        req.body = {
        	ParticipantId: 2,
        	EventId: 1,
        	pocket: 1
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          tEventParticipant2 = data;
          done();
        };
        EventParticipantCtrl.create(req, res, next);
      });

      it('should return a 200, with the eventparticipant2 object and the associated participant/event', function(done) {
        req.body = {
        	EventId: tEventParticipant2.EventId,
        	ParticipantId: tEventParticipant2.ParticipantId
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.event.title).to.equal('Counter Logic Gaming VS TSM');
          expect(data.participant.name).to.equal('Team Solo Mid');
          done();
        };
        EventParticipantCtrl.findById(req, res, next);
      });
			
		})
	})

describe('wager controller', function(){
		describe('#findById()', function(){

			it('should return a 200, placing a bet', function(done) {
        req.body = { 
        	amount: 10,
        	payout: 8,
        	EventParticipantId: 1
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.amount).to.equal(10);
          done();
        };
        WagerCtrl.create(req, res, next);
      });

      it('should return a 200, placing a bet', function(done) {
        req.body = { 
        	amount: 10,
        	payout: 8,
        	EventParticipantId: 1
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.amount).to.equal(10);
          done();
        };
        WagerCtrl.create(req, res, next);
      });
		})

		describe('#findById()', function(){

			it('should return a 200, placing a bet', function(done) {
        req.body = { 
        	amount: 9,
        	payout: 9,
        	EventParticipantId: 2
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.amount).to.equal(9.0);
          done();
        };
        WagerCtrl.create(req, res, next);
      });

			it('should return a 200, placing a bet', function(done) {
        req.body = { 
        	amount: 9,
        	payout: 9,
        	EventParticipantId: 2
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          expect(data.amount).to.equal(9.0);
          done();
        };
        WagerCtrl.create(req, res, next);
      });
		})
	})

	describe('event controller', function(){
		describe('#findById()', function(){

			it('should return a 200', function(done) {
        req.body = {
        	EventId: 1
        }
        res.json = res.send = function(httpStatus, data) {
          expect(httpStatus).to.equal(200);
          done();
        };
        EventCtrl.getWithOdds(req, res, next);
      });
		})
	})
})

