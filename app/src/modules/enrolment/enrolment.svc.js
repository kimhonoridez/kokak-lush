(function () {
	'use strict';

	angular.module('enrolment')
		.factory('EnrolmentSvc', ['$http', function ($http) {
			var svc = {};

			svc.enrol = function (pondId) {
                var req = {
                    method: 'POST',
                    url: 'api/enrol/' + pondId
                };

                return $http(req);
            };

			return svc;
		}]);
})();