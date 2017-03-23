/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';
    
    angular.module('pond')
        .factory('PondSvc', ['$http', function ($http) {
            var svc = {};

            svc.createPond = function (data) {
                var req = {
                    method: 'POST',
                    url: 'api/pond',
                    data: data
                };

                return $http(req);
            };

            svc.getPhases = function (pondId) {
                var req = {
                    method: 'GET',
                    url: 'api/pond/' + pondId + '/phases'
                };

                return $http(req);
            };

            svc.search = function (criteria) {
                var req = {
                    method: 'GET',
                    url: 'api/pond/search',
                    params: criteria
                };

                return $http(req);
            };

            svc.searchPond = function (criteria) {
                var req = {
                    method: 'GET',
                    url: 'api/pond/search/for/frog',
                    params: criteria
                };

                return $http(req);
            };

            return svc;
        }]);
})();
