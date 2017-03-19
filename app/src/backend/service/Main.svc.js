(function () {
	'use strict';

	// Require DB to be able to establish a connection to Postgres DB
	var DB = require('./DB.svc.js');

	// Collate all services into one object
	var PondService = {};
	PondService.Camel = require('./Camel.svc.js');
	PondService.PondAdmin = require('./PondAdmin.svc.js')(DB);

	module.exports = PondService;
})();