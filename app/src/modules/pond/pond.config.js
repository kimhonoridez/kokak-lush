(function () {
	'use strict';

	angular.module('pond', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.searchPond', {
					url: '/searchPond',
					templateUrl: 'app/src/modules/pond/searchPond.html'
				})
				.state('app.viewPond', {
					url: '/viewPond',
					templateUrl: 'app/src/modules/pond/viewPond.html'
				})
				.state('app.createPond', {
					url: '/createPond',
					templateUrl: 'app/src/modules/pond/createPond.html'
				}); 
		}]);
})();