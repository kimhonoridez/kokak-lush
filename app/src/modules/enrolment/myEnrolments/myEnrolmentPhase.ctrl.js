(function () {
    'use strict';

    angular.module('enrolment')
        .controller('enrolmentPhaseCtrl', ['$scope', '$state', '$timeout', 'PondSvc', 'MsgPosterSvc', 'EnrolmentSvc', function ($scope, $state, $timeout, PondSvc, MsgPosterSvc, EnrolmentSvc) {
            var vm = this;

            vm.enrolment = {
                pondAdminName: $state.params.pondAdmin,
                pondName: $state.params.pondName
            };

            $scope.phaseGridOptions = {
                dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {

                            EnrolmentSvc.getEnrolmentPhasesFrog($state.params.enrolmentId).then(function (res) {
                                options.success(res.data.result);
                            }, function (res) {
                                if (res.data.code) {
                                    MsgPosterSvc.errorMsgCode(res.data.code);
                                }
                                else {
                                    MsgPosterSvc.errorMsgCode('E_000');
                                }

                                options.success([]);
                            });
                        }
                    },
                    pageSize: 5,
                    sort: [{
                        field: "seqNo",
                        dir: "asc"
                    }]
                }),
                sortable: true,
                pageable: true,
                columns: [{
                        field: "seqNo",
                        title: "Seq No",
                        width: "100px"
                    },
                    {
                        field: "phaseName",
                        title: "Phase"
                    },
                    {
                        field: "endDate",
                        title: "End Date",
                        template: "#= endDate.substr(0, 10) #"
                    },
                    {
                        command: {
                            template: '<input type="button" class="btn btn-primary" value="Challenge" ng-click="challenge($event)"/>'
                        },
                        title: " ",
                        width: "250px"
                    }]
            };

            vm.go = function () {
                if (!vm.criteria.pondName && !vm.criteria.pondAdminName) {
                    // Criteria is empty
                    MsgPosterSvc.errorMsgCode('PA_E003');
                }
                else if ((vm.criteria.pondName && vm.criteria.pondName.length < 3) || (vm.criteria.pondAdminName && vm.criteria.pondAdminName.length < 3)) {
                    // Criteria must have at least 3 characters
                    MsgPosterSvc.errorMsgCode('PA_E001');
                }
                else if ((vm.criteria.pondName && $scope.$root.hasSpecialChars(vm.criteria.pondName)) || (vm.criteria.pondAdminName && $scope.$root.hasSpecialChars(vm.criteria.pondAdminName))) {
                    MsgPosterSvc.errorMsgCode('E_003');
                }
                else {
                    // Proceed search
                    proceedSearch();
                }
            };

            $scope.progress = function (e) {
                e.preventDefault();

                EnrolmentSvc.getEnrolmentPhasesFrog(this.dataItem.enrolmentId).then(function (res) {
                    // Refresh List
                    MsgPosterSvc.successMsgCode('EN_S001');
                    proceedSearch();
                }, function (res) {
                    // Display Message
                    if (res.data.code) {
                        MsgPosterSvc.errorMsgCode(res.data.code);
                    }
                });
            };

            function proceedSearch() {
                // Proceed search
                if ($scope.phaseGrid) {
                    $scope.phaseGrid.dataSource.page(0);
                    $scope.phaseGrid.dataSource.read();
                }
                else {
                    console.warn("[Phases] Kendo Grid not yet initialized.");
                }
            }
        }]);
})();