(function () {
    'use strict';

    angular.module('admin')
        .controller('workspaceCtrl', ['$scope', '$state', '$uibModal', 'AdminSvc', 'MsgPosterSvc', function ($scope, $state, $uibModal, AdminSvc, MsgPosterSvc) {
            var vm = this;

            $scope.workspaceGridOptions = {
                dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {

                            AdminSvc.getWorklist().then(function (res) {
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
                        field: "frogCount",
                        dir: "desc"
                    }]
                }),
                sortable: true,
                pageable: true,
                columns: [{
                        field: "pondName",
                        title: "Pond Name"
                    },
                    {
                        field: "frogCount",
                        title: "Frog Count"
                    },
                    {
                        command: {
                            template: '<input type="button" class="btn btn-primary k-grid-challengeCommand" value="View Phases" ng-click="viewPhases($event)"/>'
                        },
                        title: " ",
                        width: "250px"
                    }]
            };

            $scope.viewPhases = function (e) {
                e.preventDefault();
                var data = this.dataItem.toJSON();

                $state.go('app.workspacePhases', {
                    pondId: data.pondId,
                    pondName: data.pondName
                });
            };
        }]);
})();