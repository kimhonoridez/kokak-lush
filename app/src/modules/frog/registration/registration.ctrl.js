(function () {
	'use strict';

	angular.module('admin')
		.controller('frogRegistrationCtrl', ['$scope', '$state', 'LIP_LOCK', 'RegistrationValidationSvc', 'FrogSvc', 'MasterDataSvc', function ($scope, $state, LIP_LOCK, RegistrationValidationSvc, FrogSvc, MasterDataSvc) {

			var ErrorType = {
				NONE: 0,
				ERR_REQUIRED_FIELD: 1,
				ERR_PASSWORD_MISMATCH: 2,
				ERR_PASSWORD_INVALID: 3,
				ERR_USERNAME_IN_USE: 4,
				ERR_USERNAME_INVALID: 5,
				ERR_PASSWORD_RELATED: 6,
				OK_USERNAME: 7,
				OK_PASSWORD_MATCH: 7
			};

			var vm = this;
			vm.ErrorType = ErrorType;
			vm.errorCode = ErrorType.NONE;
			vm.data = {};
			vm.genderList = MasterDataSvc.get('GENDER');
			vm.maxDate = new Date();

			vm.msg = {
				username: ErrorType.NONE,
				password: ErrorType.NONE
			};

			function isInputValid() {
				var retVal = false;
				var tmpData = angular.copy(vm.data);

				// Initialize Message Codes
				vm.errorCode = ErrorType.NONE;

				// Check required fields
				if (!RegistrationValidationSvc.hasEmpty($scope.$root, tmpData)) {

					// Check if username is valid
					if (RegistrationValidationSvc.isUsernameValid(tmpData.username)) {
						// Check password match
						if (tmpData.userKey1 === tmpData.userKey2) {
							vm.msg.password = ErrorType.OK_PASSWORD_MATCH;

							// Check password validity
							if (RegistrationValidationSvc.isPasswordValid(tmpData)) {
								// Check if password is related to personal info
								if (RegistrationValidationSvc.isPasswordNotRelated(tmpData)) {
									// Input data valid
									retVal = true;
								}
								else {
									// Password is related to personal info
									vm.msg.password = ErrorType.ERR_PASSWORD_RELATED;
								}
							}
							else {
								// Password is invalid
								vm.msg.password = ErrorType.ERR_PASSWORD_INVALID;
							}
						}
						else{
							// Passwords mismatch
							vm.msg.password = ErrorType.ERR_PASSWORD_MISMATCH;
						}
					}
					else {
						// Username is invalid
						vm.msg.username = ErrorType.ERR_USERNAME_INVALID;
					}

				}
				else {
					// At least one required field is empty
					vm.errorCode = ErrorType.ERR_REQUIRED_FIELD;
				}

				return retVal;
			}

			vm.register = function () {
				if (isInputValid()) {
					// Reconstruct data
					var data = angular.copy(vm.data);

					// Encrypt password (A better encryption method should be used instead of this.)
					data.password = CryptoJS.AES.encrypt(data.userKey1, LIP_LOCK).toString();

					// Remove unnecessary data
					delete data.userKey1;
					delete data.userKey2;

					// Proceed registration
					FrogSvc.register(data).then(function (res) {
						$state.go('login', {registrationSuccess: true});
					}, function (res) {
						if (res.data && res.data.code) {
							if (res.data.code === 'PA_E000') {
								vm.msg.username = ErrorType.ERR_USERNAME_IN_USE;
							}
							else if (res.data.code === 'E_001') {
								vm.errorCode = ErrorType.ERR_REQUIRED_FIELD;
							}
						}
						else {
							vm.errorCode = ErrorType.ERR_GENERAL;
						}
					});
				}
			};

			vm.checkUsername = function () {
				vm.msg.username = ErrorType.NONE;

				// Check if username is valid
				if (RegistrationValidationSvc.isUsernameValid(vm.data.username)) {
					// Check if username is already taken
					FrogSvc.findByUsername(vm.data.username).then(function (res) {
						if (res.data.result === true) {
							// Username is taken
							vm.msg.username = ErrorType.ERR_USERNAME_IN_USE;
						}
						else {
							vm.msg.username = ErrorType.OK_USERNAME;
						}
					});
				}
				else {
					// Username is invalid
					vm.msg.username = ErrorType.ERR_USERNAME_INVALID;
				}
			};

			vm.checkPassword = function () {
				if (vm.data.userKey1 && vm.data.userKey2) {
					// Check password match
					if (vm.data.userKey1 === vm.data.userKey2) {
						vm.msg.password = ErrorType.OK_PASSWORD_MATCH;

						// Check password validity
						if (RegistrationValidationSvc.isPasswordValid(vm.data)) {
							// Check if password is related to personal info
							if (!RegistrationValidationSvc.isPasswordNotRelated(vm.data)) {
								// Password is related to personal info
								vm.msg.password = ErrorType.ERR_PASSWORD_RELATED;
							}
						}
						else {
							// Password is invalid
							vm.msg.password = ErrorType.ERR_PASSWORD_INVALID;
						}
					}
					else{
						// Passwords mismatch
						vm.msg.password = ErrorType.ERR_PASSWORD_MISMATCH;
					}
				}
			};

			vm.clear = function () {
				vm.data = {};
				vm.errorCode = ErrorType.NONE;
			};

			vm.back = function () {
				$state.go('login');
			};
		}]);
})();