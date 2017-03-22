(function () {
	'use strict';

	angular.module('pond')
		.controller('searchPondCtrl', ['$scope', '$state', 'PondSvc', 'MsgPosterSvc', function ($scope, $state, PondSvc, MsgPosterSvc) {
			var vm = this;

			vm.criteria = {};

			vm.clear = function () {
				vm.criteria = {};
				proceedSearch();
			};

			vm.createPond = function () {
				$state.go('app.createPond');
			};

			$scope.searchPondAdminGridOptions = {
				dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {
							PondSvc.search(vm.criteria).then(function (res) {
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
                        field: "pondName",
                        dir: "asc"
                    }]
                }),
                sortable: true,
                pageable: true,
                columns: [{
						field: "pondName",
						title: "Pond Name"
					},
					{
						field: "maxFrogs",
						title: "Max Frogs"
					},
					{
						field: "createdDate",
						title: "Date Created",
						template: "#= createdDate.substr(0, 10) #"
					},
					{
						command: {
							template: '<input type="button" class="btn btn-primary" value="View Details" ng-click="viewDetails($event)"/>'
						},
						title: " ",
						width: "250px"
					}]
			};

			vm.go = function () {
				if (!vm.criteria.pondName) {
					// Criteria is empty
					MsgPosterSvc.errorMsgCode('PA_E003');
				}
				else if (vm.criteria.pondName && vm.criteria.pondName.length < 3) {
					// Criteria must have at least 3 characters
					MsgPosterSvc.errorMsgCode('PA_E001');
				}
				else if (vm.criteria.pondName && $scope.$root.hasSpecialChars(vm.criteria.pondName)) {
					MsgPosterSvc.errorMsgCode('E_003');
				}
				else {
					// Proceed search
					proceedSearch();
				}
			};

			$scope.viewDetails = function (e) {
				e.preventDefault();

				var param = {
					criteria: angular.copy(vm.criteria),
					page: $scope.searchPondAdminGrid.dataSource.page(),
					pond: this.dataItem.toJSON()
				};

				$state.go('app.createPond', param);
			};

			function proceedSearch() {
				// Proceed search
				if ($scope.searchPondAdminGrid) {
					$scope.searchPondAdminGrid.dataSource.page(0);
					$scope.searchPondAdminGrid.dataSource.read();
				}
				else {
					console.warn("[Search Pond] Kendo Grid not yet initialized.");
				}
			}
		}]);
})();