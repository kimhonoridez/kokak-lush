(function () {
	'use strict';

	// Require DB to be able to establish a connection to Postgres DB
	var DB = require('./DB.svc.js');

	// Collate all services into one object
	var PondService = {};
	
	PondService.Camel = require('./Camel.svc.js');
	PondService.PondAdmin = require('./PondAdmin.svc.js')(DB);
	PondService.Pond = require('./Pond.svc.js')(DB);
	PondService.Frog = require('./Frog.svc.js')(DB);
	PondService.Enrolment = require('./Enrolment.svc.js')(DB);
	PondService.Answer = require('./Answer.svc.js')(DB);

	module.exports = PondService;
})();