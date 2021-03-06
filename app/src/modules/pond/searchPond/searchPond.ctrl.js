(function () {
	'use strict';

	angular.module('pond')
		.controller('searchPondCtrl', ['$scope', '$state', '$timeout', 'PondSvc', 'MsgPosterSvc', 'EnrolmentSvc', function ($scope, $state, $timeout, PondSvc, MsgPosterSvc, EnrolmentSvc) {
			var vm = this;

			vm.criteria = {};

			vm.clear = function () {
				vm.criteria = {};
				proceedSearch();
			};

			$scope.searchPondGridOptions = {
				dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {

							PondSvc.searchPond(vm.criteria).then(function (res) {
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
                        field: "pondAdminName",
                        dir: "asc"
                    }, {
                        field: "pondName",
                        dir: "asc"
                    }]
                }),
                sortable: true,
                pageable: true,
                columns: [{
						field: "pondAdminName",
						title: "Pond Admin"
					},{
						field: "pondName",
						title: "Pond Name"
					},
					{
						field: "maxFrogs",
						title: "Max Frogs"
					},
					{
						command: {
							template: '<input type="button" class="btn btn-primary" value="Enrol to Mate" ng-click="enrol($event)"/>'
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

			$scope.enrol = function (e) {
				e.preventDefault();

				EnrolmentSvc.enrol(this.dataItem.pondId).then(function (res) {
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
				if ($scope.searchPondGrid) {
					$scope.searchPondGrid.dataSource.page(0);
					$scope.searchPondGrid.dataSource.read();
				}
				else {
					console.warn("[Search Pond] Kendo Grid not yet initialized.");
				}
			}
		}]);
})();