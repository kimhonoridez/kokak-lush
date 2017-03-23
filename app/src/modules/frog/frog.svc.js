(function () {
    'use strict';

    angular.module('frog')
        .factory('FrogSvc', ['$http', function ($http) {
            var svc = {};

            svc.findByUsername = function (username) {
                var req = {
                    method: 'GET',
                    url: 'apiOut/frog/username/' + username
                };

                return $http(req);
            };

            svc.register = function (data) {
                var req = {
                    method: 'POST',
                    url: 'apiOut/frog',
                    data: data
                };

                return $http(req);
            };

            return svc;
        }]);
})(); 