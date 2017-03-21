/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    angular.module('header', [])
        .controller('headerCtrl', ['$scope', 'userInfoSvc', function ($scope, userInfoSvc) {
            this.userName = userInfoSvc.getUserInfo().firstName;

            this.noAction = function (e) {
                if ($(e.target.parentElement).hasClass('open')) {
                    // close
                    $(e.target.parentElement).removeClass('open');
                    $(e.target).closest('.dropdown-toggle')[0].setAttribute('aria-expanded', 'false');
                }
                else {
                    $(e.target.parentElement).addClass('open');
                    $(e.target).closest('.dropdown-toggle')[0].setAttribute('aria-expanded', 'true');
                }
            };
        }]);
})();
