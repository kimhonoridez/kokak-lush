/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';
    
    angular.module('masterData', [])
        .service('MasterDataSvc', ['$http', function ($http) {
            var masterDataPath = 'app/src/shared/masterData/masterData.json';
            var masterData = undefined;

            this.init = function () {
                $http.get(masterDataPath).then(function (res) {
                    masterData = res.data;
                }, function () {
                    masterData = {};
                });
            };

            this.get = function (key) {
                var retVal = [];

                if (masterData && masterData[key]) {
                    retVal = angular.copy(masterData[key]);
                }

                return retVal;
            };
        }]);
})();
