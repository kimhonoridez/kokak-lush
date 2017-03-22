/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    angular.module('pond')
        .controller('createPondCtrl', ['$scope', '$state', 'MsgPosterSvc', 'PondSvc', function ($scope, $state, MsgPosterSvc, PondSvc) {
            var vm = this;

            vm.data = {};

            vm.isOtherPondAdmin = false;
            vm.pondAdmin = "";
            
            if ($state.params.pond) {
                vm.data.pondName = $state.params.pond.pondName;
                vm.data.maxFrogs = $state.params.pond.maxFrogs;
                $scope.pondData = $state.params.pond;
            }

            vm.back = function () {
                $state.go('app.searchPond');
            };

            vm.clear = function () {
                vm.data = {};
            };

            vm.go = function () {
                vm.submitting = true;

                // check validity
                if (vm.data.pondName && vm.data.maxFrogs !== undefined) {
                    PondSvc.createPond(vm.data).then(function (res) {
                        $scope.pondData = res.data;
                        MsgPosterSvc.successMsgCode('S_000');

                        vm.viewPhases = true;
                    }, function (res) {
                        MsgPosterSvc.errorMsgCode('E_000');
                    }).finally(function () {
                        vm.submitting = false;
                    });
                }
                else {
                    MsgPosterSvc.errorMsgCode('E_002');
                    vm.submitting = false;
                }
            };
        }]);
})();
