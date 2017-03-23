(function () {
	'use strict';

	angular.module('enrolment', [])
		.config(['$stateProvider', function ($stateProvider) {
			$stateProvider
				// main state of the application
				.state('app.myEnrolments', {
					url: '/myEnrolments',
					templateUrl: 'app/src/modules/enrolment/myEnrolments/myEnrolments.html',
					params: {
						pondAdminName: undefined,
						pondName: undefined
					}
				}); 
		}]);
})();