(function () {
	'use strict';

	module.exports = function (Router, Camel, PondAdminSvc) {
		Router.get('/api/pondAdmin', getAll);
		Router.post('/api/pondAdmin', insert);

		// Get the complete list of pond admins
		function getAll(req, res) {
			PondAdminSvc.getAll(function (data) {
				for (var i = 0; i < data.rows.length; i++) {
					data.rows[i] = Camel.camelizeKeys(data.rows[i]);
				}

				res.json(data.rows);
			}, function (err) {
				res.status(500).json({code: "E000"});
			});
		}

		function insert(req, res) {
			// Mandatory Fields Checking
			if (true) {

			}

			// Username checking
			if (true) {

			}

			// Password checking
			if (true) {

			}

			// check if username already exists
			PondAdminSvc.getByUsername(req.body.username, function (result) {
				if (result.rows.length) {
					res.status(500).json({code: "T_E001"});
				}

				req.body.isMaster = req.body.isMaster == 'true';
				req.body.status = true;

				var newData = req.body;

				// Insert Data
				PondAdminSvc.insert(newData, function (data) {
					res.status(201).json({code: "SUCCESS"});
				}, function (err) {
					res.status(500).json({code: "E000"});
				});
			}, function(err) {
				res.status(500).json({code: "E000"});
			});
			
		}

		function jsonToDb() {

		}
	};
})();