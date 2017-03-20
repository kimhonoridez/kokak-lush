(function () {
	'use strict';

	module.exports = function (Router, Camel, PondAdminSvc) {
		const RegistrationUtil = require('../util/RegistrationUtil.js')();

		Router.post('/apiOut/pondAdmin', insert);
		Router.get('/apiOut/pondAdmin/username/:username', checkUsername);
		Router.get('/apiOut/pondAdmin/login', login);

		Router.get('/api/pondAdmin', getAll);

		// Get the complete list of pond admins
		function getAll(req, res) {
			PondAdminSvc.getAll(function (data) {
				for (var i = 0; i < data.rows.length; i++) {
					data.rows[i] = Camel.camelizeKeys(data.rows[i]);
				}

				res.json(data.rows);
			}, function (err) {
				res.status(500).json({code: "E_000"});
			});
		}

		function insert(req, res) {
			var data = req.body;

			// Check validity of fields
			if (RegistrationUtil.isInputValid(data, RegistrationUtil.USER_TYPE.ADMIN)) {
				// Check if username is taken
				PondAdminSvc.usernameExists(data.username || '', function (result) {
					if (result === false) {
						// Username is available
						data.isMaster = false;
						data.status = true;
						data.userId = 0

						// Insert Data
						PondAdminSvc.insert(data, function (data) {
							res.status(201).json({code: "SUCCESS"});
						}, function (err) {
							res.status(500).json({code: "E_000"});
						});
					}
					else {
						// Username is taken
						res.status(500).json({code: "PA_E000"});
					}
				}, function(err) {
					res.status(500).json({code: "E_000"});
				});
			}
			else {
				res.status(500).json({code: "E_001"});
			}
			
		}

		function checkUsername (req, res) {
			PondAdminSvc.usernameExists(req.params.username || '', function (result) {
				res.status(200).json({code: "SUCCESS", result: result});
			}, function(err) {
				res.status(500).json({code: "E_000"});
			});
		}

		function login (req, res) {
			var tmp = req.query.passphrase;

			if (tmp) {
				tmp = tmp.split('#-#');

				if (tmp.length === 2) {
					tmp = {
						username: tmp[0],
						password: tmp[1]
					};

					// Get by username
					PondAdminSvc.getByUsername(tmp.username, function (result) {
						if (result.rows.length) {
							var userData = result.rows[0];
							// Check password
							var userPass = RegistrationUtil.getActualPass(userData.password);
							var dbPass = RegistrationUtil.getActualPass(tmp.password);
							if (userPass === dbPass) {

								// Check if user is active
								if (userData.status === true) {
									delete userData.password;
									delete userData.key;
									delete userData.username;

									req.session.userId = userData.teacherId;

									res.status(200).json({code: "SUCCESS", userInfo: userData});
								}
								else {
									// User is inactive
									res.status(500).json({code: "LI_E002"});
								}
								
							}
							else {
								// Invalid login credential
								res.status(500).json({code: "LI_E001"});
							}
						}
						else {
							// Invalid login credential
							res.status(500).json({code: "LI_E003"});
						}
					}, function (err) {
						res.status(500).json({code: "E_000"});
					})
				}
				else {
					// Invalid login credential
					res.status(500).json({code: "LI_E001"});
				}
			}
			else {
				// Invalid login credential
				res.status(500).json({code: "LI_E001"});
			}
		}

		function jsonToDb() {

		}
	};
})();