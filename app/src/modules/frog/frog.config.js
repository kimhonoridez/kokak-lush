(function () {
	'use strict';

	angular.module('frog', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('frogRegistration', {
					url: '/frogRegistration',
					templateUrl: 'app/src/modules/frog/registration/registration.html'
				}); 
		}]);
})();