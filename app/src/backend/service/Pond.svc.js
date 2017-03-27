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
                        console.error('ERROR: Phase Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Pond.insertQuestionnaire = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO questionnaire(phase_id, seq_no, questions) ";
                sql += "VALUES($1, $2, $3)";

                var dataSet = [data.phaseId, 1, JSON.stringify(data.questions)];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Questionnaire Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Pond.updateQuestionnaire = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "UPDATE questionnaire SET questions=$1 WHERE question_id=$2";

                var dataSet = [JSON.stringify(data.questions), data.questionId];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Questionnaire Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Pond.lockQuestionnaire = function (questionId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "UPDATE questionnaire SET status=false WHERE question_id=$1";

                var dataSet = [questionId];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Questionnaire Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Pond.getQuestionnaireById = function (questionId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM questionnaire WHERE question_id=$1', [questionId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Questionnaires', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        Pond.getQuestionnaire = function (phaseId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM questionnaire WHERE phase_id=$1', [phaseId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Questionnaires', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
            });
        };

        Pond.getQuestionnaireAndAnswer = function (phaseId, frogId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "SELECT trx_answer.*, questionnaire.* FROM questionnaire ";
                sql += "LEFT JOIN phase ON phase.phase_id = questionnaire.phase_id ";
                sql += "LEFT JOIN trx_enrolment ON trx_enrolment.pond_id = phase.pond_id AND trx_enrolment.frog_id = $2 ";
                sql += "LEFT JOIN trx_answer ON trx_answer.question_id = questionnaire.question_id AND trx_answer.enrolment_id = trx_enrolment.enrolment_id ";
                sql += "WHERE questionnaire.phase_id = $1";

                var dataSet = [phaseId, frogId];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Questionnaires', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
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

        Pond.getWorspacePhases = function (pondId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "SELECT phase.phase_id, phase.seq_no, phase.phase_name, phase.start_date, phase.end_date, questionnaire.status, COUNT(trx_answer.answer_id) as engaged_frogs FROM phase ";
                sql += "LEFT JOIN questionnaire on questionnaire.phase_id = phase.phase_id ";
                sql += "LEFT JOIN trx_answer on trx_answer.question_id = questionnaire.question_id ";
                sql += "WHERE phase.pond_id = $1 ";
                sql += "GROUP BY phase.phase_id, phase.seq_no, phase.phase_name, phase.start_date, phase.end_date, questionnaire.status ";
                sql += "ORDER BY phase.seq_no";
                
                client.query(sql, [pondId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Workspace Phases', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
                
            });
        };

        Pond.getFrogListByPhaseId = function (phaseId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "SELECT trx_answer.answer_id, trx_answer.enrolment_id, trx_enrolment.frog_id, CONCAT(frog.first_name, \' \', frog.last_name) as frog_name, trx_answer.update_date, trx_answer.score, trx_answer.check_date FROM trx_answer ";
                sql += "LEFT JOIN questionnaire ON questionnaire.question_id = trx_answer.question_id ";
                sql += "LEFT JOIN trx_enrolment ON trx_enrolment.enrolment_id = trx_answer.enrolment_id ";
                sql += "LEFT JOIN frog ON frog.frog_id = trx_enrolment.frog_id ";
                sql += "WHERE questionnaire.phase_id = $1";
                
                client.query(sql, [phaseId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get Workspace Phases', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result.rows);
                });
                
            });
        };

        Pond.getFirstPhase = function (pondId, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                client.query('SELECT * FROM phase WHERE pond_id=$1 AND seq_no=1', [pondId], function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Pond Get first phase', err);
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
                    sql += ' AND UPPER(pond_name) LIKE $2';
                    dataSet.push(criteria.pondName.toUpperCase());
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

        Pond.searchForFrog = function (criteria, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = 'SELECT pond.pond_id, pond.pond_name, pond.max_frogs, COUNT(trx_enrolment.enrolment_id) as enrolled_count, concat(teacher.first_name, \' \',teacher.last_name) as pond_admin_name FROM pond LEFT JOIN teacher ON pond.created_by = teacher.teacher_id LEFT JOIN trx_enrolment ON trx_enrolment.pond_id = pond.pond_id ';
                var dataSet = [criteria.frogId];

                sql += "WHERE pond.pond_id NOT IN (SELECT trx_e.pond_id FROM trx_enrolment as trx_e WHERE trx_e.frog_id = $1) ";
                if (criteria.pondName || criteria.pondAdminName) {

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
                }
                sql += "GROUP BY pond.pond_id, concat(teacher.first_name, \' \',teacher.last_name)";

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
