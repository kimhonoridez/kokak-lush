(function () {
	'use strict';

	angular.module('pond', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.myPond', {
					url: '/myPond',
					templateUrl: 'app/src/modules/pond/myPond/myPond.html',
					params: {
						pondAdminName: undefined,
						pondAdminId: undefined,
						pondAdminCriteria: undefined,
						criteria: undefined,
						page: undefined
					}
				})
				.state('app.searchPond', {
					url: '/searchPond',
					templateUrl: 'app/src/modules/pond/searchPond/searchPond.html',
					params: {
						criteria: undefined
					}
				})
				.state('app.createPond', {
					url: '/createPond',
					templateUrl: 'app/src/modules/pond/createPond/createPond.html',
					params: {
						pondAdminName: undefined,
						pondAdminId: undefined,
						pondAdminCriteria: undefined,
						criteria: undefined,
						page: undefined,
						pond: undefined
					}
				}); 
		}]);
})();