'use strict';

var express = require('express'),
    path = require('path'),
    passport = require('passport')


module.exports = function(app) {
  var rootPath = path.normalize(__dirname + '/../..');

  var dbConfig = require(path.join(rootPath, 'lib', 'db', 'database.json')) 

  app.configure('development', function(){
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
      }
      next();
    });

    app.use(express.static(path.join(rootPath, '.tmp')));
    app.use(express.static(path.join(rootPath, 'app')));
    app.use(express.errorHandler());
    app.set('views', rootPath + '/app/views');

    process.env.NODE_ENV = 'development'
    process.env.MONGOHQ_URL = dbConfig.development.mongohq;
  });

  app.configure('production', function(){
    app.use(express.favicon(path.join(rootPath, 'public', 'favicon.ico')));
    app.use(express.static(path.join(rootPath, 'public')));
    app.set('views', rootPath + '/views');

    aprocess.env.MONGOHQ_URL = dbConfig.production.mongohq;
    
  });

  app.configure(function(){
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret'}));
    app.use(passport.initialize());
    app.use(passport.session());

    // Router needs to be last
    app.use(app.router);
  });
};