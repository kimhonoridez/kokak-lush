/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (Router, Camel, AnswerSvc, PondSvc, EnrolmentSvc) {

        Router.put('/api/answer', insert);

        function insert (req, res) {
            if (req.body.questionId && req.body.enrolmentId && (req.body.answer || req.body.remark || req.body.score)) {
                var data = {
                    enrolmentId: req.body.enrolmentId,
                    questionId: req.body.questionId,
                    answer: req.body.answer
                };

                if (req.body.answerId) {
                    // Update record
                    data.answerId = req.body.answerId;
                    data.remark = req.body.remark;
                    data.score = req.body.score;

                    AnswerSvc.update(data, function (result) {

                        // Update Current Phase
                        if (data.remark) {
                            PondSvc.getCurrentPhase(data.enrolmentId, function (result) {
                                if (result.length) {
                                    var tmpPhase = Camel.camelizeKeys(result[0]);

                                    if (tmpPhase.seqNo <= 5) {
                                        EnrolmentSvc.updateCurrentPhase(data.enrolmentId, tmpPhase.pondId, tmpPhase.seqNo, function (result) {
                                            res.status(200).json({code: "SUCCESS"});
                                        }, function () {
                                            res.status(500).json({code: "E_000"});
                                        });
                                    }
                                    else {
                                        res.status(200).json({code: "SUCCESS"});
                                    }
                                }
                                else {
                                    res.status(200).json({code: "SUCCESS"});
                                }
                            }, function () {
                                res.status(500).json({code: "E_000"});
                            });
                        }
                        else {
                            res.status(200).json({code: "SUCCESS"});
                        }
                    }, function (result) { 
                        res.status(500).json({code: "E_000"});
                    });
                }
                else {
                    // Create new record
                    AnswerSvc.insert(data, function (result) {
                        res.status(201).json({code: "SUCCESS"});
                    }, function (result) { 
                        res.status(500).json({code: "E_000"});
                    });
                }
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }
    };
})();