(function () {
	'use strict';

	angular.module('login')
		.controller('loginCtrl', ['$scope', '$state', '$stateParams', 'USER_TYPE', 'LIP_LOCK', 'loginSvc', 'userInfoSvc', function ($scope, $state, $stateParams, USER_TYPE, LIP_LOCK, loginSvc, userInfoSvc) {
			var vm = this;

			if ($scope.$root.CURRENT_USER_TYPE === USER_TYPE.FROG) {
				vm.isFrog = true;
			}

			if ($state.params.registrationSuccess) {
				// Display message to proceed logging-in after successful registration
				vm.isFromRegistration = true;
			}

			vm.clearMsgs = function () {
				vm.isFromRegistration = false;
				vm.loginFail = false;
				vm.isEmptyRequiredFields = false;
				vm.systemError = false;
			};

			vm.register = function () {
				if (vm.isFrog) {
					$state.go('frogRegistration');
				}
				else {
					$state.go('pondAdminRegistration');
				}
			};

			vm.login = function () {
				vm.clearMsgs();
				if (vm.username && vm.userKey) {
					var data = {
						passphrase: vm.username + '#-#' + CryptoJS.AES.encrypt(vm.userKey, LIP_LOCK).toString()
					};

					loginSvc.login(data).then(function (res) {
						// Login successful
						userInfoSvc.setUserInfo(res.data.userInfo);
						$state.go('app.dashboard');
					}, function (res) {
						if (res.data && res.data.code) {
							vm.loginFail = res.data.code;
						}
						else {
							vm.systemError = true;
						}
					});
				}
				else {
					vm.isEmptyRequiredFields = true;
				}
			};
		}]);
})();