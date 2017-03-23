(function () {
	'use strict';

	angular.module('userInfo', [])
		.service('userInfoSvc', ['$rootScope', '$http', '$kygAuthSvc', 'USER_TYPE', function ($rootScope, $http, $kygAuthSvc, USER_TYPE) {
			var vm = this;
			var userInfo = undefined;

			var resSuperAdmin = ["pa_c", "pa_v", "po_c", "po_v_a", "ph_v", "qn_c", "qn_u", "qn_v", "en_v_a", "an_v"];
			var resPondAdmin = ["pa_c", "po_c", "po_v_a", "ph_v", "qn_c", "qn_u", "qn_v", "en_v_a", "an_u", "an_v"];
			var resFrog = ["po_v_f", "ph_v", "qn_v", "fr_c", "en_c", "en_v_f", "en_u", "dv_v", "an_c", "an_u", "an_v"];

			vm.getUserInfo = function () {
				return angular.copy(userInfo);
			};

			vm.setUserInfo = function (data) {
				userInfo = data;

				// Get Resource List based on user type
				var resourceList = [];
				if (userInfo.userType === "FROG") {
					resourceList = resFrog;
				}
				else if (userInfo.userType === "ADMIN") {
					if (userInfo.isMaster) {
						resourceList = resSuperAdmin;
					}
					else {
						resourceList = resPondAdmin;
					}
				}

				// Set User Authorization Resource List
				$kygAuthSvc.setUserAuthResourceList(resourceList);
			};

			vm.logout = function () {
				var req = {
					method: 'POST',
					url: 'apiOut/logout'
				};

				return $http(req);
			};

			return vm;
		}]);
})();