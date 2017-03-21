(function () {
	'use strict';

	angular.module('admin')
		.controller('searchPondAdminCtrl', ['$scope', 'AdminSvc', 'MsgPosterSvc', function ($scope, AdminSvc, MsgPosterSvc) {
			var vm = this;

			vm.criteria = {};

			vm.clear = function () {
				vm.criteria = {};
				proceedSearch();
			};

			$scope.searchPondAdminGridOptions = {
				dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                        	AdminSvc.search(vm.criteria).then(function (res) {
                        		options.success(res.data);
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
                		template: '<input type="button" class="btn btn-primary" value="View Ponds" ng-click="mate($event)"/>'
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