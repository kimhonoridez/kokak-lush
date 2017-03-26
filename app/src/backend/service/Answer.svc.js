/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (DB) {
        var Answer = {};

        Answer.insert = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "INSERT INTO trx_answer(enrolment_id, question_id, answer, update_date) ";
                sql += "VALUES($1, $2, $3, NOW())";

                var dataSet = [data.enrolmentId, data.questionId, JSON.stringify(data.answer)];

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Answer Insert', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        Answer.update = function (data, successCallback, failCallback) {
            DB.connect(function (err, client, done) {
                var sql = "UPDATE trx_answer SET ";
                var dataSet = [data.answerId];

                if (data.score || (data.remark && data.remark.length)) {
                    sql += "score = $2 ";
                    sql += "remark = $3 ";
                    sql += "check_date = NOW() ";

                    dataSet.push(data.score);
                    dataSet.push(JSON.stringify(data.remark));
                }
                else if (data.answer && data.answer.length) {
                    sql += "answer = $2, ";
                    sql += "update_date = NOW() ";

                    dataSet.push(JSON.stringify(data.answer));
                }

                sql += "WHERE answer_id = $1";

                client.query(sql, dataSet, function (err, result) {
                    done();

                    if (err) {
                        console.error('ERROR: Answer Update', err);
                        failCallback(err);
                        return;
                    }

                    successCallback(result);
                });
            });
        };

        return Answer;
    };
})();
