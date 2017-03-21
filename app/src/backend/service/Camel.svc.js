(function () {
	'use strict';

	const camelcase = require('camelcase');
	const decamelcase = require('decamelize');
	
	module.exports = {
		camelize: function (str) {
			return camelcase(str);
		},
		decamelize: function (str) {
			return decamelcase(str);
		},
		camelizeKeys: function (obj) {
			var keys = Object.keys(obj);
			var retVal = {};

			keys.forEach(function (item) {
				retVal[camelcase(item)] = obj[item];
			});

			return retVal;
		},
		decamelizeKeys: function (obj) {
			var keys = Object.keys(obj);
			var retVal = {};

			keys.forEach(function (item) {
				retVal[decamelcase(item)] = obj[item];
			});

			return retVal;
		},
		hasSpecialChars : function (str) {
			return !(/^[A-Za-z0-9 _%-]+$/.test(str));
		}
	};
})();