'use strict';

angular.module('mainApp', [
  'ui.router',
  // load loginService provider first
  'loginService', 
  // load app components
  'c-home',
  'c-register',
  'c-error'


])
.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  
}])
.run(function ($rootScope) {
  /**
   * $rootScope.doingResolve is a flag useful to display a spinner on changing states.
   * Some states may require remote data so it will take awhile to load.
   */
  var resolveDone = function () { $rootScope.doingResolve = false; };
  $rootScope.doingResolve = false;

  $rootScope.$on('$stateChangeStart', function () {
    console.log('statechangestart')
    $rootScope.doingResolve = true;
  });
  $rootScope.$on('$stateChangeSuccess', resolveDone);
  $rootScope.$on('$stateChangeError', resolveDone);
  $rootScope.$on('$statePermissionError', resolveDone);
})
.controller('MainCtrl', function ($scope, $state, $stateParams, loginService, $http, $timeout) {

  $scope.$state = $state;
  $scope.$stateParams = $stateParams;

  // loginService exposed and a new Object containing login user/pwd
  $scope.ls = loginService;
  $scope.login = {
    working: false,
    wrong: false
  };
  $scope.loginMe = function () {
    // setup promise, and 'working' flag
    var loginPromise = $http.post('/auth/login', $scope.login);
    $scope.login.working = true;
    $scope.login.wrong = false;

    loginService.loginUser(loginPromise);
    loginPromise.error(function () {
      $scope.login.wrong = true;
      $timeout(function () { $scope.login.wrong = false; }, 8000);
    });
    loginPromise.finally(function () {
      $scope.login.working = false;
    });
  };
  $scope.logoutMe = function () {
    loginService.logoutUser($http.get('/auth/logout'));
  };
});