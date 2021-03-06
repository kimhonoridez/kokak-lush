(function () {
    'use strict';

    angular.module('admin')
        .controller('workspacePhaseCtrl', ['$scope', '$state', '$uibModal', 'AdminSvc', 'MsgPosterSvc', 'QuestionnaireSvc', function ($scope, $state, $uibModal, AdminSvc, MsgPosterSvc, QuestionnaireSvc) {
            var vm = this;

            vm.pondName = $state.params.pondName;

            $scope.phaseGridOptions = {
                dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {

                            AdminSvc.getWorklistPhases($state.params.pondId).then(function (res) {
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
                        field: "startDate",
                        title: "Start Date",
                        template: "#= startDate.substr(0, 10) #"
                    },
                    {
                        field: "endDate",
                        title: "End Date",
                        template: "#= endDate.substr(0, 10) #"
                    },
                    {
                        field: "status",
                        title: "Status",
                        template: "#= status === true ? 'Active' : status === false ? 'Locked' : '' #"
                    },
                    {
                        field: "engagedFrogs",
                        title: "Engaged Frogs"
                    },
                    {
                        command: {
                            template: '<input type="button" class="btn btn-primary k-grid-challengeCommand" value="Frog List" ng-click="frogList($event)"/><input type="button" class="btn btn-danger k-grid-lockCommand" style="margin-left: 10px" value="Lock" ng-click="lock($event)"/>',
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

                        if (model.status === false) {
                            // Mark this phase as completed
                            angular.element(this).find(".k-grid-lockCommand").remove();
                        }
                    });
                }
            };

            vm.back = function () {
                $state.go('app.workspace');
            };

            $scope.lock = function (e) {
                e.preventDefault();
                var data = this.dataItem.toJSON();

                // Lock
                QuestionnaireSvc.lockQuestionnaire(data.questionId).then(function (res) {
                    MsgPosterSvc.successMsgCode('S_000');

                    if ($scope.phaseGrid) {
                        $scope.phaseGrid.dataSource.read();
                    }
                }, function (res) {
                    if (res.data.code) {
                        MsgPosterSvc.getMsg(res.data.code);
                    }
                });
            };

            $scope.frogList = function (e) {
                e.preventDefault();
                var data = this.dataItem.toJSON();

                $state.go('app.developmentList', {
                    pondId: $state.params.pondId,
                    pondName: $state.params.pondName,
                    phaseId: data.phaseId,
                    phaseName: data.phaseName
                });
            };
        }]);
})();