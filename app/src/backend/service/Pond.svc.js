/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (DB) {
        var Pond = {};

        Pond.insert = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO pond(pond_name, max_frogs, status, created_by, created_date) ";
                sql += "VALUES($1, $2, $3, $4, NOW()) RETURNING pond_id";

                var dataSet = [data.pondName, data.maxFrogs, true, data.createdBy];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Admin Insert', err);
                        failCallback(err);
                        return;
                    }

                    var data = {
                        pondId: result.rows[0].pond_id
                    };

                    successCallback(data);
                });
            });
        };

        Pond.insertPhase = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO phase(pond_id, seq_no, phase_name, start_date, end_date) ";
                sql += "VALUES($1, $2, $3, NOW() + interval '" + data.seqNo + "' day, NOW() + interval '" + data.seqNo + "' day)";

                var dataSet = [data.pondId, data.seqNo, data.phaseName];

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

        Pond.getPhases = function (pondId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM phase WHERE pond_id=$1', [pondId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Phases', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        Pond.search = function (criteria, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = 'SELECT * FROM pond WHERE created_by=$1';
                var dataSet = [criteria.teacherId];

                if (criteria.pondName) {
                    sql += ' AND pond_name LIKE $2';
                    dataSet.push(criteria.pondName);
                }

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Search', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        return Pond;
    };
})();
