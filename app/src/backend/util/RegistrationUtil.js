(function () {
	'use strict';

	module.exports = function () {
		const USER_TYPE = {
			FROG: 1,
			ADMIN: 2
		};

		const LIP_LOCK = 'Frog!@34##567HopU*Iu';
		const CryptoJS = require("crypto-js");

		var RegistrationUtil = {};

		RegistrationUtil.USER_TYPE = {
			FROG: 1,
			ADMIN: 2
		};

		RegistrationUtil.isInputValid = function(tmpData, type) {
			var retVal = true;

			// Check required fields
			if (!RegistrationUtil.hasEmpty(tmpData, type)) {

				// Check if username is valid
				if (RegistrationUtil.isUsernameValid(tmpData.username)) {
					// Decrypt Cypher Phrase
					var tmp = CryptoJS.AES.decrypt(tmpData.password, LIP_LOCK).toString(CryptoJS.enc.Utf8);

					// Check password validity
					if (RegistrationUtil.isPasswordValid(tmp)) {
						// Check if password is related to personal info
						if (!RegistrationUtil.isPasswordNotRelated(tmp, tmpData)) {
							// Input data invalid
							retVal = false;
							console.log("Password is related.");
						}
					}
					else {
						// Password is invalid
						retVal = false;
						console.log("Password is invalid.");
					}
				}
				else {
					// Username is invalid
					retVal = false;
					console.log("Username is invalid.");
				}

			}
			else {
				// At least one required field is empty
				retVal = false;
				console.log("At least one required field is empty.");
			}

			return retVal;
		};

		RegistrationUtil.hasEmpty = function (data, type) {
			if (type === USER_TYPE.FROG) {
				return RegistrationUtil.hasEmptyFrogData(data);
			}
			else {
				return RegistrationUtil.hasEmptyPondAdminData(data);
			}
		};

		RegistrationUtil.hasEmptyPondAdminData = function (data) {
			var retVal = false;

			// Check if any of the fields is empty
			if (!data.username || !data.password || !data.firstName || !data.lastName) {
				retVal = true;
			}

			return retVal;
		};

		RegistrationUtil.hasEmptyFrogData = function (data) {
			var retVal = false;

			// Check if any of the fields is empty
			if (!data.username || !data.password || !data.firstName || !data.lastName || !data.birthDate || !data.gender) {
				retVal = true;
			}

			return retVal;
		};

		RegistrationUtil.isPasswordValid = function (data) {
			var retVal = true;
			var criteria = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
			var upper = data.toUpperCase();

			// Password must be 7 - 25 characters long
			if (data.length < 7 || data.length > 25) {
				retVal = false;
			}
			// Password must be a combination of Upper and Lower Case Letters & Number
			else if (!(upper !== data && data.toLowerCase() !== data && criteria.test(data))) {
				retVal = false;
			}

			return retVal;
		};

		RegistrationUtil.isPasswordNotRelated = function (data, inputData) {
			var retVal = true;
			var upper = data.toUpperCase();

			// Password must not be related to username, first name or last name
			if (inputData.username && inputData.firstName && inputData.lastName &&
				(upper.indexOf(inputData.username.toUpperCase()) >= 0 ||
				upper.indexOf(inputData.firstName.toUpperCase()) >= 0 ||
				upper.indexOf(inputData.lastName.toUpperCase()) >= 0)) {
				retVal = false;
			}

			return retVal;
		};

		RegistrationUtil.isUsernameValid = function (username) {
			var retVal = true;

			// Username must be 7 - 25 characters long and should be alphanumeric
			if (username && (username.length < 7 || username.length > 25 || !(/^[a-zA-Z0-9]+$/.test(username)))) {
				retVal = false;
			}

			return retVal;
		};

		RegistrationUtil.getActualPass = function (data) {
			// Decrypt Cypher Phrase
			return CryptoJS.AES.decrypt(data, LIP_LOCK).toString(CryptoJS.enc.Utf8);
		};

		return RegistrationUtil;
	};
})();