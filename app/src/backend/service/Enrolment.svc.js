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

        Enrolment.searchFrogEnrolments = function (criteria, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var dataSet = [criteria.frogId];
                var sql = 'SELECT trx_enrolment.enrolment_id, trx_enrolment.current_phase_id, CONCAT(teacher.first_name, \' \', teacher.last_name) as pond_admin, pond.pond_name, phase.phase_name FROM trx_enrolment ';
                sql += 'LEFT JOIN pond ON pond.pond_id = trx_enrolment.pond_id ';
                sql += 'LEFT JOIN phase ON phase.phase_id = trx_enrolment.current_phase_id ';
                sql += 'LEFT JOIN teacher ON pond.created_by = teacher.teacher_id ';
                sql += 'WHERE trx_enrolment.frog_id=$1';

                if (criteria.pondName) {
                    sql += ' AND UPPER(pond.pond_name) LIKE $2 ';
                    dataSet.push(criteria.pondName.toUpperCase());
                }

                if (criteria.pondAdminName) {
                    if (criteria.pondName) {
                        sql += ' AND UPPER(CONCAT(teacher.first_name, \' \',teacher.last_name)) LIKE $3 ';
                    }
                    else {
                        sql += ' AND UPPER(CONCAT(teacher.first_name, \' \',teacher.last_name)) LIKE $2 ';
                    }
                    dataSet.push(criteria.pondAdminName.toUpperCase());
                }

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Enrolment checking', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        Enrolment.getEnrolmentPhasesFrog = function (enrolmentId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var dataSet = [enrolmentId];
                var sql = 'SELECT phase.phase_id, phase.seq_no, phase.phase_name, phase.end_Date FROM phase ';
                sql += 'LEFT JOIN trx_enrolment ON phase.pond_id = trx_enrolment.pond_id ';
                sql += 'WHERE trx_enrolment.enrolment_id=$1';

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Getting enrolment phases for frog', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        Enrolment.insert = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO trx_enrolment(pond_id, frog_id, current_phase_id, created_date) ";
                sql += "VALUES($1, $2, $3, NOW())";

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
