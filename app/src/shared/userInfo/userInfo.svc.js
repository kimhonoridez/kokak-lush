(function () {
	'use strict';

	angular.module('userInfo', [])
		.service('userInfoSvc', ['$rootScope', '$http', 'USER_TYPE', function ($rootScope, $http, USER_TYPE) {
			var vm = this;
			var userInfo = undefined;

			vm.getUserInfo = function () {
				return angular.copy(userInfo);
			};

			vm.setUserInfo = function (data) {
				userInfo = data;
			};

			return vm;
		}]);
})();