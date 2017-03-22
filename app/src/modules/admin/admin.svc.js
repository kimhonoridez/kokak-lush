(function () {
	'use strict';

	angular.module('admin')
		.factory('AdminSvc', ['$http', function ($http) {
			var svc = {};

			svc.findByUsername = function (username) {
				var req = {
					method: 'GET',
					url: 'apiOut/pondAdmin/username/' + username
				};

				return $http(req);
			};

			svc.register = function (data) {
				var req = {
					method: 'POST',
					url: 'apiOut/pondAdmin',
					data: data
				};

				return $http(req);
			};

			svc.search = function (criteria) {
				var req = {
					method: 'GET',
					url: 'api/pondAdmin/search',
					params: criteria
				};

				return $http(req);
			};

			return svc;
		}]);
})(); 