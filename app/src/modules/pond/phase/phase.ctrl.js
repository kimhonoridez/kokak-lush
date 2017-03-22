/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    angular.module('pond')
        .controller('phaseCtrl', ['$scope', 'PondSvc', 'MsgPosterSvc', function ($scope, PondSvc, MsgPosterSvc) {
            var vm = this;

            $scope.frogPhaseGridOptions = {
                dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                            PondSvc.getPhases($scope.$parent.pondData.pondId).then(function (res) {
                                options.success(res.data.result);
                            }, function () {
                                MsgPosterSvc.errorMsgCode('E_000');
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
                        title: "Seq No"
                    },
                    {
                        field: "phaseName",
                        title: "Phase Name"
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
                        command: {
                            template: '<input type="button" class="btn btn-primary" value="Update" ng-click="mate($event)"/>'
                        },
                        title: " ",
                        width: "250px"
                    }]
            };
        }]);
})();
