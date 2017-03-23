/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (DB) {
        var Enrolment = {};

        Enrolment.checkEnrolment = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM trx_enrolment WHERE pond_id=$1 AND frog_id=$2', [data.pondId, data.frogId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Enrolment checking', err);
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

        Enrolment.insert = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO trx_enrolment(pond_id, frog_id, current_phase_id) ";
                sql += "VALUES($1, $2, $3)";

                var dataSet = [data.pondId, data.frogId, data.currentPhaseId];

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

        return Enrolment;
    };
})();
