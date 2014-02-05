'use strict'

angular.module('c-error', ['c-base'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.error', {
      url: '/error/:error',
      templateUrl: 'partials/error',
      accessLevel: accessLevels.public
    });
});
