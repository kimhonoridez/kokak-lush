(function () {
	'use strict';

	angular.module('admin')
		.controller('pondAdminRegistrationCtrl', ['$scope', '$state', 'RegistrationValidationSvc', 'AdminRegistrationSvc', function ($scope, $state, RegistrationValidationSvc, AdminRegistrationSvc) {

			var ErrorType = {
				NONE: 0,
				ERR_REQUIRED_FIELD: 1,
				ERR_PASSWORD_MISMATCH: 2,
				ERR_PASSWORD_INVALID: 3,
				ERR_USERNAME_IN_USE: 4,
				ERR_USERNAME_INVALID: 5,
				ERR_PASSWORD_RELATED: 6
			};

			var vm = this;
			vm.ErrorType = ErrorType;
			vm.errorCode = ErrorType.NONE;
			vm.data = {};

			function isInputValid() {
				var retVal = false;
				var tmpData = angular.copy(vm.data);
				vm.errorCode = ErrorType.NONE;

				// Check required fields
				if (!RegistrationValidationSvc.hasEmpty($scope.$root, tmpData)) {

					// Check if username is valid
					if (RegistrationValidationSvc.isUsernameValid(tmpData.username)) {
						// Check password match
						if (tmpData.userKey1 === tmpData.userKey2) {
							// Check password validity
							if (RegistrationValidationSvc.isPasswordValid(tmpData)) {
								// Check if password is related to personal info
								if (RegistrationValidationSvc.isPasswordNotRelated(tmpData)) {
									// Input data valid
									retVal = true;
								}
								else {
									// Password is related to personal info
									vm.errorCode = ErrorType.ERR_PASSWORD_RELATED;
								}
							}
							else {
								// Password is invalid
								vm.errorCode = ErrorType.ERR_PASSWORD_INVALID;
							}
						}
						else{
							// Passwords mismatch
							vm.errorCode = ErrorType.ERR_PASSWORD_MISMATCH;
						}
					}
					else {
						// Username is invalid
						vm.errorCode = ErrorType.ERR_USERNAME_INVALID;
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

					// Remove unnecessary data
					delete data.userKey1;
					delete data.userKey2;

					// Encrypt password
					var encData = "";
					data.password = encData;

					// Proceed registration
					console.log("Registration Success");
				}
			};

			vm.checkUsername = function () {
				// Check if username is valid
				if (RegistrationValidationSvc.isUsernameValid(vm.data.username)) {
					// Check if username is already taken
					if (true) {
						
					}
					else {
						// Username is invalid
						vm.errorCode = ErrorType.ERR_USERNAME_IN_USE;
					}
				}
				else {
					// Username is invalid
					vm.errorCode = ErrorType.ERR_USERNAME_INVALID;
				}
			};
			
			vm.checkPassword = function () {
				if (vm.data.userKey1 && vm.data.userKey2) {
					// Check password match
					if (vm.data.userKey1 === vm.data.userKey2) {
						// Check password validity
						if (RegistrationValidationSvc.isPasswordValid(vm.data)) {
							// Check if password is related to personal info
							if (!RegistrationValidationSvc.isPasswordNotRelated(vm.data)) {
								// Password is related to personal info
								vm.errorCode = ErrorType.ERR_PASSWORD_RELATED;
							}
						}
						else {
							// Password is invalid
							vm.errorCode = ErrorType.ERR_PASSWORD_INVALID;
						}
					}
					else{
						// Passwords mismatch
						vm.errorCode = ErrorType.ERR_PASSWORD_MISMATCH;
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