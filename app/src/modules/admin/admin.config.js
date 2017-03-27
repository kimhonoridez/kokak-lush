(function () {
	'use strict';

	angular.module('admin', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.searchPondAdmin', {
					url: '/searchPondAdmin',
					templateUrl: 'app/src/modules/admin/search/searchPondAdmin.html',
					params: {
						pondAdminCriteria: undefined
					}
				})
				.state('app.workspace', {
					url: '/workspace',
					templateUrl: 'app/src/modules/admin/workspace/workspace.html'
				})
				.state('app.workspacePhases', {
					url: '/workspacePhases',
					templateUrl: 'app/src/modules/admin/workspace/workspacePhase.html',
					params: {
						pondId: undefined,
						pondName: undefined
					}
				})
				.state('app.developmentList', {
					url: '/workspacePhases',
					templateUrl: 'app/src/modules/admin/workspace/developmentList.html',
					params: {
						pondId: undefined,
						pondName: undefined,
						phaseId: undefined,
						phaseName: undefined
					}
				})
				.state('pondAdminRegistration', {
					url: '/pondAdminRegistration',
					templateUrl: 'app/src/modules/admin/registration/registration.html'
				}); 
		}]);
})();