'use strict';

angular.module('mainApp')
.controller('NavbarCtrl', function ($scope, $location) {
  $scope.menu = [{
    'title': 'Home',
    'state': 'app.home'
  },
  {
    'title': 'Register',
    'state': 'app.register'
  }];

  $scope.isActive = function(route) {
    return route === $location.path();
  };
});
