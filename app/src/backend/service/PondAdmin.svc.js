(function () {
	'use strict';

	module.exports = function (DB) {
		var PondAdmin = {};

		PondAdmin.getByUsername = function (username, successCallback, failCallback) {
			DB.connect(function (err, client, done) {
				client.query('SELECT * FROM teacher WHERE username=$1', [username], function (err, result) {
					done();

					if (err) {
						console.error('ERROR: PondAdmin Get By Username', err);
						failCallback(err);
						return;
					}

					successCallback(result);
				});
			});
		};

		PondAdmin.getAll = function (successCallback, failCallback) {
			DB.connect(function (err, client, done) {
				client.query('SELECT * FROM teacher', [], function (err, result) {
					done();

					if (err) {
						console.error('ERROR: Pond Admin Get All', err);
						failCallback(err);
						return;
					}

					successCallback(result);
				});
			});
		};

		PondAdmin.updateStatus = function (id, status, successCallback, failCallback) {
			DB.connect(function (err, client, done) {

				client.query('UPDATE teacher SET status=$1, updated_date=$2, updated_date=NOW()', [status, id], function (err, result) {
					done();

					if (err) {
						console.error('ERROR: Pond Admin Update Status', err);
						failCallback(err);
						return;
					}

					successCallback(result);
				});
			});
		};

		PondAdmin.changePassword = function (data, successCallback, failCallback) {
			// Get password from DB

			// Decrypt password from DB

			// Compare password from DB and inputted value

			// Encrypt new password

			// Insert new password
		};

		PondAdmin.insert = function (data, successCallback, failCallback) {
			DB.connect(function (err, client, done) {
				var sql = "INSERT INTO teacher(username, password, first_name, last_name, is_master, status, updated_by, updated_date) ";
				sql += "VALUES($1, $2, $3, $4, $5, $6, $7, NOW())";

				// encrypt password
				var encyptedPass = data.password;

				var dataSet = [data.username, encyptedPass, data.firstName, data.lastName, data.isMaster, data.status, data.userId];

				client.query(sql, dataSet, function (err, result) {
					done();

					if (err) {
						console.error('ERROR: Pond Admin Insert', err);
						failCallback(err);
						return;
					}

					successCallback(result);
				});
			});
		};

		return PondAdmin;
	};
})();