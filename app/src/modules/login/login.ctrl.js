(function () {
	'use strict';

	angular.module('login')
		.controller('loginCtrl', ['$scope', '$state', '$stateParams', '$kygAuthConfigSvc', 'USER_TYPE', 'LIP_LOCK', 'loginSvc', 'userInfoSvc', function ($scope, $state, $stateParams, $kygAuthConfigSvc, USER_TYPE, LIP_LOCK, loginSvc, userInfoSvc) {
			var vm = this;

			if ($scope.$root.CURRENT_USER_TYPE === USER_TYPE.FROG) {
				vm.isFrog = true;
			}

			if ($state.params.registrationSuccess) {
				// Display message to proceed logging-in after successful registration
				vm.isFromRegistration = true;
			}

			if ($state.params.status) {
				vm.loginFail = $state.params.status;
			}

			vm.displayLogin = false;

			// Test if there's an existing session
			function test() {
				loginSvc.test().then(function (res) {
					// Has existing session
					userInfoSvc.setUserInfo(res.data.userInfo);

					if (vm.isFrog) {
						$state.go('app.myEnrolments');
					}
					else {
						$state.go('app.myPond');
					}
					
				}, function (res) {
					// No session
					console.log('No session');
					vm.displayLogin = true;
				});
			}

			// Check if session is available
			$kygAuthConfigSvc.init(test, test);

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
						
						if (vm.isFrog) {
							$state.go('app.myEnrolments');
						}
						else {
							$state.go('app.myPond');
						}
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