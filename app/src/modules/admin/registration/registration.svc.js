(function () {
	'use strict';

	angular.module('admin')
		.service('AdminRegistrationSvc', ['$http', function ($http) {
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
		}]);
})();