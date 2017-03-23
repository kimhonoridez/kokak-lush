/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
(function () {
    'use strict';

    angular.module('authorization')
        .factory('$kygAuthConfigSvc', ['$http', '$kygAuthSvc', function ($http, $kygAuthSvc) {
            var authConfigPath = "app/src/shared/authorization/authConfig.json";
            var me = {};
            var hasLoaded = false;

            me.setAuthConfig = function (path, successCb, failCb) {
                $http.get(path).then(function (res) {
                    // Set authorization configuration
                    if (res.data && res.data instanceof Object) {
                        $kygAuthSvc.setAuthConfig(res.data);
                    }

                    // If success callback is available, call it
                    hasLoaded = true;
                    if (successCb) {
                        successCb()
                    }
                }, function () {
                    hasLoaded = false;
                    // If fail callback is available, call it
                    if (failCb) {
                        failCb();
                    }
                });
            };

            me.init = function (successCb, failCb) {
                if (!hasLoaded) {
                    me.setAuthConfig(authConfigPath, successCb, failCb);
                }
                else {
                    successCb();
                }
            };

            return me;
        }]);
})();