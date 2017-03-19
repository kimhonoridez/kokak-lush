(function () {
	'use strict';

	module.exports = function (Router, PondService) {
		var PondRest = {};
		PondRest.PondAdmin = require('./PondAdmin.rest.js')(Router, PondService.Camel, PondService.PondAdmin);
	};
	
})();