(function () {
	'use strict';

	angular.module('admin', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('pondAdminRegistration', {
					url: '/pondAdminRegistration',
					templateUrl: 'app/src/modules/admin/registration/registration.html'
				}); 
		}]);
})();