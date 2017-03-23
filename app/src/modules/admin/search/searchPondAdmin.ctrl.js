(function () {
	'use strict';

	angular.module('admin')
		.controller('searchPondAdminCtrl', ['$scope', '$state', '$timeout', 'AdminSvc', 'MsgPosterSvc', function ($scope, $state, $timeout, AdminSvc, MsgPosterSvc) {
			var vm = this;

			vm.criteria = {};
			vm.stateParam = $state.params.pondAdminCriteria;

			vm.clear = function () {
				vm.criteria = {};
				proceedSearch();
			};

			$scope.searchPondAdminGridOptions = {
				dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                        	if (vm.stateParam) {
								vm.criteria = vm.stateParam;
                        	}

                        	AdminSvc.search(vm.criteria).then(function (res) {
                        		options.success(res.data);

                        		if (vm.stateParam) {
                        			$timeout(function () {
										$scope.searchPondAdminGrid.dataSource.page(vm.stateParam.page);
                        				vm.stateParam = undefined;
                        			}, 200);
                        		}
                        	}, function (res) {
                        		if (res.data.code) {
                        			MsgPosterSvc.errorMsgCode(res.data.code);
                        		}
                        		options.success([]);
                        	});
                        }
                    },
                    pageSize: 5,
                    sort: [{
                        field: "firstName",
                        dir: "asc"
                    }, {
                        field: "lastName",
                        dir: "asc"
                    }]
                }),
                sortable: true,
                pageable: true,
                columns: [{
                    field: "firstName",
                    title: "First Name"
                },
                {
                    field: "lastName",
                    title: "Last Name"
                },
                {
                	command: {
                		template: '<input type="button" class="btn btn-primary" value="View Ponds" ng-click="viewPonds($event)"/>'
                	}, 
                	title: " ",
                	width: "250px"
                }]
			};

			vm.go = function () {
				if (!vm.criteria.firstName && !vm.criteria.lastName) {
					// Criteria is empty
					MsgPosterSvc.errorMsgCode('PA_E002');
				}
				else if ((vm.criteria.firstName && vm.criteria.firstName.length < 3) || 
						(vm.criteria.lastName && vm.criteria.firstName.length < 3)) {
					// Criteria must have at least 3 characters
					MsgPosterSvc.errorMsgCode('PA_E001');
				}
				else if ((vm.criteria.firstName && $scope.$root.hasSpecialChars(vm.criteria.firstName)) || 
						(vm.criteria.lastName && $scope.$root.hasSpecialChars(vm.criteria.lastName))) {
					MsgPosterSvc.errorMsgCode('E_003');
				}
				else {
					// Proceed search
					proceedSearch();
				}
			};

			$scope.viewPonds = function (e) {
				e.preventDefault();
				var dataItem = this.dataItem.toJSON();
				vm.criteria.page = $scope.searchPondAdminGrid.dataSource.page();

				var param = {
					pondAdminId: dataItem.teacherId,
					pondAdminName: dataItem.firstName + " " + dataItem.lastName,
					pondAdminCriteria: angular.copy(vm.criteria) 
				};

				$state.go('app.myPond', param);
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