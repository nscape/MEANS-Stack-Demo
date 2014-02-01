'use strict'

angular.module('c-register', ['c-base'])
.config(function ($stateProvider) {
  $stateProvider
    .state('app.register', {
      url: '/register',
      templateUrl: 'partials/register',
      controller: 'RegisterCtrl',
      accessLevel: accessLevels.anon
    });
})
.controller('RegisterCtrl', function ($scope, $http, $timeout, $state) {
	$scope.xhr = false;
	$scope.redirect = false;

	$scope.submit = function (formInstance) {
		// xhr is departing
		$scope.xhr = true;
		$http.post('/register', $scope.registerObj)
		.success(function (data, status, headers, config) {
			console.info('post success - ', data);
			$scope.xhr = false;
			$scope.redirect = true;
			$timeout(function () {
				$state.go('app.home');
			}, 2000);
		})
		.error(function (data, status, headers, config) {
			/*
			data.errors.forEach(function (error, index, array) {
				formInstance[error.field].$error[error.name] = true;
			});
			*/
			formInstance.$setPristine();
			console.info('post error - ', data);
			$scope.xhr = false;
		});
	};
});
