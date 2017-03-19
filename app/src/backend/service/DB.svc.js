(function () {
	'use strict';

	const pg = require('pg');
	const dbConnectionUrl = 'postgres://postgres:salvosa@localhost/mypond';

	module.exports = {
		connect : function (callback) {
			pg.connect(dbConnectionUrl, function (err, client, done) {  
				if (err) {
					return console.error('error fetching client from pool', err);
				}

				if (callback) {
					callback(err, client, done);
				}
				
			});
		}
	}
})();