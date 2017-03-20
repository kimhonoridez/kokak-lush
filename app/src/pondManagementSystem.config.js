(function () {
	'use strict';

	angular.module('pondManagementSystem', ['ui.bootstrap', 'ui.router', 'kendo.directives', 'shared', 'modules'])
		.constant('USER_TYPE', {
			'FROG': 1, 
			'ADMIN': 2
		})
		.constant('LIP_LOCK', 'Frog!@34##567HopU*Iu')
		.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
			$stateProvider
				// main state of the application
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'app/src/modules/layout/app.html'
				});
				
			// Disable HTML5 mode
			$locationProvider.html5Mode(false);
			
			// Set default state
			$urlRouterProvider.otherwise('/login');
		}])
		.run(['$rootScope', 'USER_TYPE', function ($rootScope, USER_TYPE) {
			$rootScope.CURRENT_USER_TYPE = USER_TYPE.ADMIN;
			var win = nw.Window.get();
			win.maximize();
		}]);
})();