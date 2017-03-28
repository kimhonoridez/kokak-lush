(function () {
    'use strict';

    angular.module('enrolment')
        .controller('enrolmentPhaseCtrl', ['$scope', '$state', '$uibModal', 'PondSvc', 'MsgPosterSvc', 'EnrolmentSvc', function ($scope, $state, $uibModal, PondSvc, MsgPosterSvc, EnrolmentSvc) {
            var vm = this;

            vm.enrolment = {
                pondAdminName: $state.params.pondAdmin,
                pondName: $state.params.pondName
            };

            $scope.currentPhaseId = $state.params.currentPhaseId;

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
                        title: "Estimated End Date",
                        template: "#= endDate.substr(0, 10) #"
                    },
                    {
                        field: "score",
                        title: "Score"
                    },
                    {
                        command: {
                            template: '<input type="button" class="btn btn-primary k-grid-challengeCommand" value="Challenge" ng-click="challenge($event)"/>',
                            visible: function(dataItem) { 
                                return dataItem.phaseId === currentPhaseId;
                            }
                        },
                        title: " ",
                        width: "250px"
                    }],
                dataBound: function (e) {
                    var grid = this;
 
                    grid.tbody.find("tr[role='row']").each(function () {
                        var model = grid.dataItem(this);
                        
                        if (model.phaseId < $scope.currentPhaseId || (model.score !== null && model.score !== undefined)) {
                            // Mark this phase as completed
                            angular.element(this).find("td:last").html("Completed").addClass("completed");
                        }
                        else if (model.phaseId > $scope.currentPhaseId) {
                            // Remove the Challenge
                            angular.element(this).find('.k-grid-challengeCommand').remove();
                        }
                    });
                }
            };

            vm.back = function () {
                $state.go('app.myEnrolments', $state.params);
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

            $scope.challenge = function (e) {
                e.preventDefault();
                var data = this.dataItem.toJSON();
                data.enrolmentId = parseInt($state.params.enrolmentId);

                var modalInstance = $uibModal.open({
                    templateUrl : '/app/src/modules/pond/questionnaire/answerSheet/answerSheet.html',
                    controller: 'answerSheetCtrl as vm',
                    resolve: {
                        data: data
                    }
                }).result.then(function () {
                    // Do Nothing
                }, function () {
                    // Do Nothing
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