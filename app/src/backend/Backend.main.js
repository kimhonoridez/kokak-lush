(function () {
	'use strict';

	const express = require('express');
	const bodyParser = require('body-parser');

	var app = express();

	// configure the app to use bodyParser()
	app.use(bodyParser.urlencoded({
	    extended: true
	}));
	app.use(bodyParser.json());

	var PondService = require('./service/Main.svc.js');
	require('./rest/Main.rest.js')(app, PondService);

	app.listen(3000, function () {
		console.log('Example app listening on port 3000!')
	});
})();