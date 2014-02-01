'use strict'

angular.module('c-home', ['c-base'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/',
      templateUrl: 'partials/home',
      controller: 'HomeCtrl'
    });
})
.controller('HomeCtrl', function ($scope) {
  //add stuff
});
