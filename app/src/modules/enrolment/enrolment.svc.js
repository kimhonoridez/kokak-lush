(function () {
	'use strict';

	angular.module('enrolment')
		.factory('EnrolmentSvc', ['$http', 'userInfoSvc', function ($http, userInfoSvc) {
			var svc = {};

			svc.enrol = function (pondId) {
                var req = {
                    method: 'POST',
                    url: 'api/enrol/' + pondId
                };

                return $http(req);
            };

			svc.searchMyEnrolments = function (criteria) {
				var req = {
					method: 'GET',
					url: 'api/enrol/frog/' + userInfoSvc.getUserInfo().frogId,
					params: criteria
				};

				return $http(req);
			};

			svc.getEnrolmentPhasesFrog = function (enrolmentId) {
				var req = {
					method: 'GET',
					url: 'api/enrol/' + enrolmentId + '/phases/frog'
				};

				return $http(req);
			};

			return svc;
		}]);
})();