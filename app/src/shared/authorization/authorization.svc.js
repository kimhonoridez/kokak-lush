/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
(function () {
    'use strict';

    angular.module('authorization', [])
        .service('$kygAuthSvc', [function () {
            var authConfigPath = "app/src/shared/authorization/authConfig.json";
            var userAuthResourceList = [];
            var authConfig = {};

            this.setAuthConfig = function (data) {
                if (data && data instanceof Object) {
                    authConfig = data;
                }

                // Preset COMMON
                authConfig["COMMON"] = {
                    "resource": "COMMON",
                    "description": "This is the resource for all common functions"
                };
            };

            /**
             * Set the list of resource names representing use cases
             *
             * @param resourceList
             *  the list of resource names representing use cases
             */
            this.setUserAuthResourceList = function (resourceList) {
                if (resourceList && resourceList.constructor === [].constructor) {
                    userAuthResourceList = resourceList;
                }
            };

            this.configure = function (path, resourceList) {
                authConfigPath = path;

                if (resourceList && resourceList.constructor === [].constructor) {
                    userAuthResourceList = resourceList;
                }
            };

            this.getUsecaseDescription = function (usecase) {
                var retVal = "";

                if (authConfig[usecase]) {
                    retVal = authConfig[usecase].description;
                }

                return retVal;
            };

            this.isAuthorized = function (usecase) {
                var retVal = false;
                usecase = usecase.replace(' ', '');

                if (usecase) {
                    var usecases = usecase.split(',');

                    for (var i = 0; i < usecases.length; i++) {
                        if (isAuth(usecases[i])) {
                            retVal = true;
                            break;
                        }
                    }
                }

                return retVal;
            };

            this.getOriginConfig = function (usecase) {
                return authConfig[usecase];
            };

            function isAuth(usecase) {
                var retVal = false;

                if (usecase && authConfig[usecase]) {
                    for (var i = 0; i < userAuthResourceList.length; i++) {
                        // COMMON is a resource which can be used by common modules that do not require resource names
                        if (userAuthResourceList[i] === authConfig[usecase].resource || authConfig[usecase].resource === 'COMMON') {
                            retVal = true;
                            break;
                        }
                    }
                }

                return retVal;
            }
        }]);
})();