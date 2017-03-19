(function () {
	'use strict';

	angular.module('registrationValidation', [])
		.factory('RegistrationValidationSvc', ['USER_TYPE', function (USER_TYPE) {
			var vm = {};

			function hasEmptyPondAdminData(data) {
				var retVal = false;

				// Check if any of the fields is empty
				if (!data.username || !data.userKey1 || !data.userKey2 || !data.firstName || !data.lastName) {
					retval = true;
				}

				return retVal;
			}

			function hasEmptyFrogData(data) {
				var retVal = false;

				// Check if any of the fields is empty
				if (!data.username || !data.userKey1 || !data.userKey2 || !data.firstName || !data.lastName || !data.birthDate || !data.gender) {
					retval = true;
				}

				return retVal;
			}

			vm.hasEmpty = function (root, data) {
				if (root.CURRENT_USER_TYPE === USER_TYPE.FROG) {
					return hasEmptyFrogData(data);
				}
				else {
					return hasEmptyPondAdminData(data);
				}
			};

			vm.isPasswordValid = function (inputData) {
				var retVal = true;
				var criteria = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
				var data = inputData.userKey1;
				var upper = data.toUpperCase();

				// Password must be 7 - 25 characters long
				if (data.length < 7 || data.length > 25) {
					retVal = false;
				}
				// Password must be a combination of Upper and Lower Case Letters & Number
				else if (!(upper !== data && data.toLowerCase() !== data && criteria.test(data))) {
					retVal = false;
				}
				// Password must not be related to username, first name or last name
				else if (upper.indexOf(inputData.username.toUpperCase()) >= 0 || 
						upper.indexOf(inputData.firstName.toUpperCase()) >= 0 || 
						upper.indexOf(inputData.lastName.toUpperCase()) >= 0) {
					retVal = false;
				}

				return retVal;
			};

			vm.isUsernameValid = function (username) {
				var retVal = true;
				var criteria = /^[a-zA-Z0-9]+$/;

				// Username must be 7 - 25 characters long and should be alphanumeric
				if (username.length < 7 || username.length > 25 || !criteria.test(username)) {
					retVal = false;
				}

				return retVal;
			};

			return vm;
		}]);
})();