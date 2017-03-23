/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    angular.module('pond')
        .controller('createPondCtrl', ['$scope', '$state', 'MsgPosterSvc', 'PondSvc', function ($scope, $state, MsgPosterSvc, PondSvc) {
            var vm = this;
            vm.stateParams = angular.copy($state.params);

            vm.data = {};

            $scope.isOtherPondAdmin = false;
            vm.pondAdmin = "";
            
            // Setup pond details
            if ($state.params.pond) {
                vm.data.pondName = vm.stateParams.pond.pondName;
                vm.data.maxFrogs = vm.stateParams.pond.maxFrogs;
                $scope.pondData = angular.copy(vm.stateParams.pond);
            }

            // Setup Pond Admin details if applicable
			if (vm.stateParams.pondAdminId) {
				$scope.isOtherPondAdmin = true;

				vm.pondAdmin = {
					pondAdminId: vm.stateParams.pondAdminId,
					pondAdminName: vm.stateParams.pondAdminName,
					pondAdminCriteria: vm.stateParams.pondAdminCriteria
				};
			}

            vm.back = function () {
                $state.go('app.myPond', angular.copy($state.params));
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
