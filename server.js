'use strict';

// Module dependencies
var express = require('express');

var app = express();

// Express configuration
require('./lib/config/express')(app);

// Mongo
var mongodb = require('./lib/db/mongo');

// Sequelize
var sequelize = require('./lib/db/sequelize');

sequelize
	.sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      console.log('Sequelize sync complete');
    }
  })
    

// Passport configuration
require('./lib/config/passport');

// Server routes
require('./lib/routes.js')(app);

// Set port
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});

// Expose app
exports = module.exports = app;