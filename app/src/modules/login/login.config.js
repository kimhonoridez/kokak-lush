(function () {
	'use strict';

	angular.module('login', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('login', {
					url: '/login',
					templateUrl: 'app/src/modules/login/login.html',
					params: {
						registrationSuccess: null,
						status: null
					}
				}); 
		}]);
})();