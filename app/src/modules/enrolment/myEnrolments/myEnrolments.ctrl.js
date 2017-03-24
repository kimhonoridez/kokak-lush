(function () {
	'use strict';

	angular.module('enrolment')
		.controller('enrolmentCtrl', ['$scope', '$state', '$timeout', 'PondSvc', 'MsgPosterSvc', 'EnrolmentSvc', function ($scope, $state, $timeout, PondSvc, MsgPosterSvc, EnrolmentSvc) {
			var vm = this;

			vm.criteria = {};

			vm.stateParams = $state.params;

			// Setup search criteria for the newly enrolled pond
			if (vm.stateParams.pondAdminId) {
				vm.pondAdmin = {
					pondAdminId: vm.stateParams.pondAdminId,
					pondAdminName: vm.stateParams.pondAdminName,
					pondAdminCriteria: vm.stateParams.pondAdminCriteria
				};
			}

			vm.clear = function () {
				vm.criteria = {};
				proceedSearch();
			};

			$scope.searchEnrolmentGridOptions = {
				dataSource: new  kendo.data.DataSource({
                    transport: {
                        read: function (options) {
                        	// Initialize data
                        	if (vm.stateParams.criteria) {
                        		vm.criteria = vm.stateParams.criteria || {};
                        	}

							EnrolmentSvc.searchMyEnrolments(vm.criteria).then(function (res) {
								options.success(res.data.result);

								if (vm.stateParams.criteria) {
									$timeout(function () {
										$scope.searchEnrolmentGrid.dataSource.page(vm.stateParams.page);
										vm.stateParams.criteria = undefined;
									}, 100);
								}
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
						field: "pondAdmin",
						title: "Pond Admin"
					},{
						field: "pondName",
						title: "Pond Name"
					},
					{
						field: "phaseName",
						title: "Current Phase"
					},
					{
						command: {
							template: '<input type="button" class="btn btn-primary" value="Progress" ng-click="progress($event)"/>'
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

			$scope.progress = function (e) {
				e.preventDefault();

				// View Progress in each phase
				$state.go('app.myEnrolmentPhase', {
					enrolmentId: this.dataItem.enrolmentId,
					pondAdmin: this.dataItem.pondAdmin,
					pondName: this.dataItem.pondName,
					myEnrolmentSearchCriteria: vm.criteria
				});
			};

			function proceedSearch() {
				// Proceed search
				if ($scope.searchEnrolmentGrid) {
					$scope.searchEnrolmentGrid.dataSource.page(0);
					$scope.searchEnrolmentGrid.dataSource.read();
				}
				else {
					console.warn("[Search Pond] Kendo Grid not yet initialized.");
				}
			}
		}]);
})();