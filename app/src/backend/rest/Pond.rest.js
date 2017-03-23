(function () {
    'use strict';

    module.exports = function (Router, Camel, PondSvc) {

        Router.post('/api/pond', savePond);
        Router.get('/api/pond/search', search);
        Router.get('/api/pond/search/for/frog', searchForFrog);

        // Phase-related  APIs
        Router.get('/api/pond/:pondId/phases', getPhases);

        // Questionnaire-related APIs
        Router.get('/api/pond/phase/:phaseId/questionnaire', getQuestionnaire);
        Router.put('/api/pond/phase/questionnaire', updateQuestionnaire);
        Router.put('/api/pond/phase/questionnaire/:questionId/lock', lockQuestionnaire);
        Router.post('/api/pond/phase/questionnaire', saveQuestionnaire);

        var phases = ['Peaceful Egg', 'Lively Tadpole', 'Tadpole with Legs', 'Froglet', 'Full Grown Frog'];
        var MAX_QUESTIONS = 5;

        function preSavePhases (res, data) {
            if (data.seqNo < phases.length) {
                data.phaseName = phases[data.seqNo++];

                PondSvc.insertPhase(data, function (result) {
                    preSavePhases(res, data);
                }, function(err) {
                    preSavePhases(res, data);
                });
            }
            else {
                res.status(201).json({code: "SUCCESS", pondId: data.pondId});
            }
        }
        
        function savePond(req, res) {
            var data = req.body;

            // Check validity of fields
            if (data.pondName && data.maxFrogs !== undefined) {
                data.createdBy = req.session.userId;

                // Insert Pond
                PondSvc.insert(data, function (result) {
                    // Auto-create phases for this pond
                    console.log(result);
                    result.seqNo = 0;
                    preSavePhases(res, result);
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function updateQuestionnaire(req, res) {
            var data = req.body;

            // Check validity of fields
            if (data.questionId && data.questions.length === MAX_QUESTIONS) {

                // Check if questionnaire is  locked
                PondSvc.getQuestionnaireById(data.questionId, function (result) {
                    if (result.length && result[0].status) {
                        // Update Questionnaire
                        PondSvc.updateQuestionnaire(data, function (result) {
                            res.status(200).json({code: "SUCCESS"});
                        }, function(err) {
                            res.status(500).json({code: "E_000"});
                        });
                    }
                    else {
                        // Questionnaire is already locked
                        res.status(500).json({code: "PO_E001"});
                    }
                }, function () {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function saveQuestionnaire(req, res) {
            var data = req.body;

            // Check validity of fields
            if (data.phaseId && data.questions.length === MAX_QUESTIONS) {

                // Insert Questionnaire
                PondSvc.insertQuestionnaire(data, function (result) {
                    res.status(200).json({code: "SUCCESS"});
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function getPhases(req, res) {
            if (req.params.pondId) {
                PondSvc.getPhases(req.params.pondId, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = Camel.camelizeKeys(result[i]);
                    }
                    res.status(200).json({code: "SUCCESS", result: result});
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function lockQuestionnaire (req, res) {
            if (req.params.questionId) {
                PondSvc.lockQuestionnaire(req.params.questionId, function (result) {
                    res.status(200).json({code: "SUCCESS"});
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function getQuestionnaire (req, res) {
            if (req.params.phaseId) {
                PondSvc.getQuestionnaire(req.params.phaseId, function (result) {
                    var retVal = undefined;
                    var code = "EMPTY_RESULT";

                    if (result.length) {
                        retVal = Camel.camelizeKeys(result[0]);
                        retVal.questions = JSON.parse(retVal.questions);
                        code = "SUCCESS";
                    }

                    res.status(200).json({code: code, result: retVal});
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function search (req, res) {
            var criteria = {
                pondName: req.query.pondName,
                teacherId: req.query.pondAdminId ? req.query.pondAdminId : req.session.userId
            };

            if (criteria.pondName && Camel.hasSpecialChars(criteria.pondName)) {
                res.status(500).json({code: "E_003"});
            }
            else {
                PondSvc.search(criteria, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = Camel.camelizeKeys(result[i]);
                    }
                    res.status(200).json({code: "SUCCESS", result: result});
                }, function (err) {
                    res.status(500).json({code: "E_000"});
                });
            }
        }

        function searchForFrog (req, res) {
            var criteria = {
                pondName: req.query.pondName,
                pondAdminName: req.query.pondAdminName,
                frogId: req.session.userId
            };

            if ((criteria.pondName && Camel.hasSpecialChars(criteria.pondName)) ||
                    (criteria.pondAdminName && Camel.hasSpecialChars(criteria.pondAdminName))) {
                res.status(500).json({code: "E_003"});
            }
            else {
                PondSvc.searchForFrog(criteria, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = Camel.camelizeKeys(result[i]);
                    }
                    res.status(200).json({code: "SUCCESS", result: result});
                }, function (err) {
                    res.status(500).json({code: "E_000"});
                });
            }
        }
    };
})();