(function () {
	'use strict';

	angular.module('login')
		.factory('loginSvc', ['$rootScope', '$http', 'USER_TYPE', function ($rootScope, $http, USER_TYPE) {
			var vm = this;

			vm.login = function (data) {
				var req = {
					method: 'GET',
					params: data
				};

				if ($rootScope.CURRENT_USER_TYPE === USER_TYPE.FROG) {
					req.url = 'apiOut/frog/login';
				}
				else {
					req.url = 'apiOut/pondAdmin/login';
				}

				return $http(req);
			};

			vm.test = function () {
				console.log("testing");
				var req = {
					method: 'GET'
				};

				if ($rootScope.CURRENT_USER_TYPE === USER_TYPE.FROG) {
					req.url = 'apiOut/frog/test';
				}
				else {
					req.url = 'apiOut/pondAdmin/test';
				}

				return $http(req);
			};

			return vm;
		}]);
})();