/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (DB) {
        var Frog = {};

        Frog.getByUsername = function (username, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM frog WHERE username=$1', [username], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Frog Get By Username', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Frog.getById = function (id, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM frog WHERE frog_id=$1', [id], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Frog Get By Id', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Frog.usernameExists = function (username, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM frog WHERE username=$1', [username], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Frog Get By Username', err);
                        failCallback(err);
                        return;
                    }

                    var retVal = false;

                    if (result.rows.length) {
                        retVal = true;
                    }

                    successCallback(retVal);
                });
            });
        };

        Frog.changePassword = function (data, successCallback, failCallback) {
            // Get password from DB

            // Decrypt password from DB

            // Compare password from DB and inputted value

            // Encrypt new password

            // Insert new password
        };

        Frog.insert = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO frog(username, password, first_name, last_name, birth_date, gender, key, updated_by, updated_date) ";
                sql += "VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW())";

                var key = data.username + "#-#" + data.password;
                var dataSet = [data.username, data.password, data.firstName, data.lastName, data.birthDate, data.gender, key, data.userId];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Frog Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        return Frog;
    };
})();
