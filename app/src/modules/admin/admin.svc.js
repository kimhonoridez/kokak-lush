(function () {
	'use strict';

	angular.module('admin')
		.service('AdminSvc', ['$http', function ($http) {
			this.findByUsername = function (username) {
				var req = {
					method: 'GET',
					url: 'apiOut/pondAdmin/username/' + username
				};

				return $http(req);
			};

			this.register = function (data) {
				var req = {
					method: 'POST',
					url: 'apiOut/pondAdmin',
					data: data
				};

				return $http(req);
			};

			this.search = function (criteria) {
				var req = {
					method: 'GET',
					url: 'api/pondAdmin/search',
					params: criteria
				};

				return $http(req);
			};
		}]);
})(); 