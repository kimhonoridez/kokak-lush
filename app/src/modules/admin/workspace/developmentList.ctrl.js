(function () {
    'use strict';

    angular.module('admin')
        .controller('frogDevelopmentCtrl', ['$scope', '$state', '$uibModal', 'AdminSvc', 'MsgPosterSvc', function ($scope, $state, $uibModal, AdminSvc, MsgPosterSvc) {
            var vm = this;

            vm.pondName = $state.params.pondName;
            vm.phaseName = $state.params.phaseName;

            $scope.phaseGridOptions = {
                dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {

                            AdminSvc.getDevelopmentList($state.params.phaseId).then(function (res) {
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
                        field: "frogName",
                        dir: "asc"
                    }],
                    schema: {
                        model: { 
                            id: "answerId",
                            fields: {
                                answerId: { type: 'number' },
                                enrolmentId: { type: 'number' },
                                frogId: { type: 'number' },
                                updateDate: { type: 'date'},
                                score: { type: 'number' },
                                checkDate: { type: 'date' },
                                status: { type: 'boolean' }
                            }
                        }
                    }
                }),
                sortable: true,
                pageable: true,
                columns: [{
                        field: "frogName",
                        title: "Frog Name"
                    },
                    {
                        field: "updateDate",
                        title: "Last Update",
                        format: "{0: yyyy-MM-dd hh:mm tt}"
                    },
                    {
                        field: "score",
                        title: "Score"
                    },
                    {
                        field: "checkDate",
                        title: "Check Date",
                        format: "{0: yyyy-MM-dd hh:mm tt}"
                    },
                    {
                        command: {
                            template: '<input type="button" class="btn btn-primary k-grid-challengeCommand" value="Check Development" ng-click="challenge($event)"/>',
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

                        if (model.checkDate) {
                            // Mark this phase as completed
                            angular.element(this).find("td:last").html("Checked").addClass("completed");
                        }
                    });
                }
            };

            vm.back = function () {
                $state.go('app.workspacePhases', $state.params);
            };

            $scope.challenge = function (e) {
                e.preventDefault();
                var data = this.dataItem.toJSON();
                data.phaseId = parseInt($state.params.phaseId);
                data.isChecking = true;

                var modalInstance = $uibModal.open({
                    templateUrl : '/app/src/modules/pond/questionnaire/answerSheet/answerSheet.html',
                    controller: 'answerSheetCtrl as vm',
                    resolve: {
                        data: data
                    }
                }).result.then(function () {
                    // Refresh Grid
                    if ($scope.phaseGrid) {
                        $scope.phaseGrid.dataSource.read();
                    }
                }, function () {
                    // Do Nothing
                });
            };
        }]);
})();