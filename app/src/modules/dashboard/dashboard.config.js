(function () {
	'use strict';

	angular.module('dashboard', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.dashboard', {
					url: '/dashboard',
					templateUrl: 'app/src/modules/dashboard/dashboard.html',
					params: {
						registrationSuccess: null
					}
				}); 
		}]);
})();