/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (Router, Camel, EnrolmentSvc, PondSvc) {

        Router.post('/api/enrol/:pondId', insert);
        Router.get('/api/enrol/frog/:frogId', searchFrogEnrolments);
        Router.get('/api/enrol/:enrolmentId/phases/frog', getEnrolmentPhasesFrog);

        function insert (req, res) {
            if (req.params.pondId) {
                var data = {
                    pondId: req.params.pondId,
                    frogId: req.session.userId
                };

                // Check if user has already enrolled to this pond
                EnrolmentSvc.checkEnrolment(data, function (result) {
                    if (result === false) {

                        // Get First Phase
                        PondSvc.getFirstPhase(data.pondId, function (result) {
                            if (result.length) {
                                data.currentPhaseId = Camel.camelizeKeys(result[0]).phaseId;

                                // Proceed persisting data
                                EnrolmentSvc.insert(data, function () {
                                    res.status(201).json({code: "SUCCESS"});
                                }, function () {
                                    res.status(500).json({code: "E_000"});
                                });
                            }
                            else {
                                res.status(500).json({code: "E_000"});
                            }
                        }, function (result) {
                            res.status(500).json({code: "E_000"});
                        });
                        
                    }
                    else {
                        // User is already enrolled to this pond
                        res.status(500).json({code: "EN_E001"});
                    }
                }, function (result) { 
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function searchFrogEnrolments (req, res) {
            console.log(req.params);
            if (req.params.frogId) {
                var criteria = {
                    frogId: req.params.frogId,
                    pondName: req.query.pondName,
                    pondAdminName: req.query.pondAdminName
                };

                // Validate Criteria
                if ((criteria.pondName && Camel.hasSpecialChars(criteria.pondName)) || (criteria.pondAdminName && Camel.hasSpecialChars(criteria.pondAdminName))) {
                    res.status(500).json({code: "E_003"});
                }
                else {
                    // Proceed search
                    EnrolmentSvc.searchFrogEnrolments(criteria, function (result) {
                        for (var i = 0; i < result.length; i++) {
                            result[i] = Camel.camelizeKeys(result[i]);
                        }
                        res.status(200).json({code: "SUCCESS", result: result});
                    }, function (result) {
                        res.status(500).json({code: "E_000"});
                    });
                }
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }
        
        function getEnrolmentPhasesFrog (req, res) {
            if (req.params.enrolmentId) {
                EnrolmentSvc.getEnrolmentPhasesFrog(req.params.enrolmentId, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i] = Camel.camelizeKeys(result[i]);
                    }
                    res.status(200).json({code: "SUCCESS", result: result});
                }, function (result) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }
    };
})();