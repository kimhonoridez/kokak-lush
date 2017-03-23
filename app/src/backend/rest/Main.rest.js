(function () {
	'use strict';

	module.exports = function (Router, PondService) {
		var PondRest = {};
		PondRest.PondAdmin = require('./PondAdmin.rest.js')(Router, PondService.Camel, PondService.PondAdmin);
		PondRest.Pond = require('./Pond.rest.js')(Router, PondService.Camel, PondService.Pond);
		PondRest.Frog = require('./Frog.rest.js')(Router, PondService.Camel, PondService.Frog);
	};
	
})();