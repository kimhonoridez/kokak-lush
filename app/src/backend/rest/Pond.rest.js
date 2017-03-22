(function () {
    'use strict';

    module.exports = function (Router, Camel, PondSvc) {

        Router.post('/api/pond', savePond);
        Router.get('/api/pond/:pondId/phases', getPhases);
        Router.get('/api/pond/search', search);

        var phases = ['Peaceful Egg', 'Lively Tadpole', 'Tadpole with Legs', 'Froglet', 'Full Grown Frog'];

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
    };
})();