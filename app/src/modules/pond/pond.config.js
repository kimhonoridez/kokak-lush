(function () {
	'use strict';

	angular.module('pond', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.searchPond', {
					url: '/searchPond',
					templateUrl: 'app/src/modules/pond/searchPond.html',
					params: {
						searchCriteria: undefined
					}
				})
				.state('app.viewPond', {
					url: '/viewPond',
					templateUrl: 'app/src/modules/pond/viewPond.html',
					params: {
						searchCriteria: undefined
					}
				})
				.state('app.createPond', {
					url: '/createPond',
					templateUrl: 'app/src/modules/pond/createPond.html',
					params: {
						pondAdmin: undefined,
						pondAdminId: undefined,
						criteria: undefined,
						page: undefined,
						pond: undefined
					}
				}); 
		}]);
})();