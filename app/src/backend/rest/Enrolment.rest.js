/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (Router, Camel, EnrolmentSvc, PondSvc) {

        Router.post('/api/enrol/:pondId', insert);

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
    };
})();