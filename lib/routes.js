var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

var _ = require('underscore')
  , passport =  require('passport')
  , controllers =  require(path.join(rootPath, 'lib', 'controllers'))
  , IndexCtrl =  require(path.join(rootPath, 'lib', 'controllers', 'index'))
  , AuthCtrl =  require(path.join(rootPath, 'lib', 'controllers', 'auth'))
  , userRoles = require(path.join(rootPath, 'app', 'scripts', 'routingConfig')).userRoles
  , accessLevels = require(path.join(rootPath, 'app', 'scripts', 'routingConfig')).accessLevels;

var routes = [

    
  // Views
  {
      path: '/partials/*',
      httpMethod: 'GET',
      middleware: [IndexCtrl.partials]
  },
  /*
  // Local Auth
  {
      path: '/register',
      httpMethod: 'POST',
      middleware: [AuthCtrl.register]
  },
  {
      path: '/login',
      httpMethod: 'POST',
      middleware: [AuthCtrl.login]
  },
  {
      path: '/logout',
      httpMethod: 'POST',
      middleware: [AuthCtrl.logout]
  },

  // User resource
  {
      path: '/users',
      httpMethod: 'GET',
      middleware: [UserCtrl.index],
      accessLevel: accessLevels.admin
  },
  */

  {
      path: '/register',
      httpMethod: 'POST',
      middleware: [AuthCtrl.register]
  },

      {
      path: '/login',
      httpMethod: 'POST',
      middleware: [AuthCtrl.login]
  },


  // All other get requests should be handled by AngularJS's client-side routing system
  {
    path: '/*',
    httpMethod: 'GET',
    middleware: [function(req, res) {
      var role = userRoles.public, username = '';
      if(req.user) {
        role = req.user.role;
        username = req.user.username;
      }
      res.cookie('user', JSON.stringify({
        'username': username,
        'role': role
      }));
      res.render('index');
    }]
  }
    
];

module.exports = function(app) {

  _.each(routes, function(route) {
    route.middleware.unshift(ensureAuthorized);
    var args = _.flatten([route.path, route.middleware]);

    switch(route.httpMethod.toUpperCase()) {
      case 'GET':
        app.get.apply(app, args);
        break;
      case 'POST':
        app.post.apply(app, args);
        break;
      case 'PUT':
        app.put.apply(app, args);
        break;
      case 'DELETE':
        app.delete.apply(app, args);
        break;
      default:
        throw new Error('Invalid HTTP method specified for route ' + route.path);
        break;
    }
  });
}

function ensureAuthorized(req, res, next) {
  var role;
  if(!req.user) role = userRoles.public;
  else          role = req.user.role;

  var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;

  if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
  return next();
}