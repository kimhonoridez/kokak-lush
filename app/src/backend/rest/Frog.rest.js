/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    module.exports = function (Router, Camel, FrogSvc) {
        const RegistrationUtil = require('../util/RegistrationUtil.js')();

        Router.post('/apiOut/frog', insert);
        Router.get('/apiOut/frog/username/:username', checkUsername);
        Router.get('/apiOut/frog/login', login);
        Router.get('/apiOut/frog/test', test);

        function insert(req, res) {
            var data = req.body;

            // Check validity of fields
            if (RegistrationUtil.isInputValid(data, RegistrationUtil.USER_TYPE.FROG)) {
                // Check if username is taken
                FrogSvc.usernameExists(data.username || '', function (result) {
                    if (result === false) {
                        // Username is available
                        data.isMaster = false;
                        data.status = true;
                        data.userId = 0;

                        // Insert Data
                        FrogSvc.insert(data, function (data) {
                            res.status(201).json({code: "SUCCESS"});
                        }, function (err) {
                            res.status(500).json({code: "E_000"});
                        });
                    }
                    else {
                        // Username is taken
                        res.status(500).json({code: "PA_E000"});
                    }
                }, function(err) {
                    res.status(500).json({code: "E_000"});
                });
            }
            else {
                res.status(500).json({code: "E_001"});
            }
        }

        function checkUsername (req, res) {
            FrogSvc.usernameExists(req.params.username || '', function (result) {
                res.status(200).json({code: "SUCCESS", result: result});
            }, function(err) {
                res.status(500).json({code: "E_000"});
            });
        }

        function login (req, res) {
            var tmp = req.query.passphrase;

            if (tmp) {
                tmp = tmp.split('#-#');

                if (tmp.length === 2) {
                    tmp = {
                        username: tmp[0],
                        password: tmp[1]
                    };

                    // Get by username
                    FrogSvc.getByUsername(tmp.username, function (result) {
                        if (result.rows.length) {
                            var userData = result.rows[0];
                            userData = Camel.camelizeKeys(userData);
                            // Check password
                            var userPass = RegistrationUtil.getActualPass(userData.password);
                            var dbPass = RegistrationUtil.getActualPass(tmp.password);
                            if (userPass === dbPass) {
                                cleanup(userData);

                                req.session.userId = userData.teacherId;
                                req.session.userType = "FROG";
                                userData.userType = req.session.userType;

                                res.status(200).json({code: "SUCCESS", userInfo: userData});
                            }
                            else {
                                // Invalid login credential
                                res.status(500).json({code: "LI_E001"});
                            }
                        }
                        else {
                            // Invalid login credential
                            res.status(500).json({code: "LI_E003"});
                        }
                    }, function (err) {
                        res.status(500).json({code: "E_000"});
                    })
                }
                else {
                    // Invalid login credential
                    res.status(500).json({code: "LI_E001"});
                }
            }
            else {
                // Invalid login credential
                res.status(500).json({code: "LI_E001"});
            }
        }

        function cleanup (userData) {
            delete userData.password;
            delete userData.key;
            delete userData.username;
        }

        function test (req, res) {
            if (req.session.userId) {
                console.log("Session Available: " + req.session.userId);

                if (req.session.userType === "FROG") {
                    FrogSvc.getById(parseInt(req.session.userId), function (result) {
                        if (result.rows.length) {
                            var userData = result.rows[0];
                            cleanup(userData);
                            userData.userType = req.session.userType;
                            res.status(200).json({code: "SUCCESS", userInfo: Camel.camelizeKeys(userData)});
                        }
                        else {
                            // User does not exist
                            res.status(401).json({code: "UNAUTHORIZED"});
                        }
                    }, function (err) {
                        res.status(500).json({code: "E_000"});
                    });
                }
                else {
                    res.status(401).json({code: "UNAUTHORIZED"});
                }

            }
            else {
                res.status(401).json({code: "UNAUTHORIZED"});
            }
        }

    };
})();
