/*
 * Created by: kim.honoridez
 * Description:
 */
(function () {
    'use strict';

    angular.module('pond')
        .controller('phaseCtrl', ['$scope', '$uibModal', 'PondSvc', 'MsgPosterSvc', function ($scope, $uibModal, PondSvc, MsgPosterSvc) {
            var vm = this;

            var columns = [{
                    field: "seqNo",
                    title: "Seq No",
                    width: "100px"
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
                        template: '<input type="button" class="btn btn-primary" value="View Questionnaire" ng-click="viewQuestionnaire($event)"/>'
                    },
                    title: " ",
                    width: "250px"
            }];

            if ($scope.$parent.isOtherPondAdmin) {
                columns.pop();
            }

            $scope.viewQuestionnaire = function (e) {
                e.preventDefault();

                var modalInstance = $uibModal.open({
                    templateUrl : '/app/src/modules/pond/questionnaire/create/createQuestionnaire.html',
                    controller: 'createQuestionnaireCtrl as vm',
                    resolve: {
                        data: this.dataItem.toJSON()
                    }
                }).result.then(function () {
                    // Do Nothing
                }, function () {
                    // Do Nothing
                });
            };

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
                columns: columns
            };
        }]);
})();
