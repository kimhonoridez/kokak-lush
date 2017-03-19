(function () {
	'use strict';

	angular.module('login')
		.controller('loginCtrl', ['$scope', '$state', 'USER_TYPE', function ($scope, $state, USER_TYPE) {
			var vm = this;

			if ($scope.$root.CURRENT_USER_TYPE === USER_TYPE.FROG) {
				vm.isFrog = true;
			}

			vm.register = function () {
				if (vm.isFrog) {
					$state.go('frogRegistration');
				}
				else {
					$state.go('pondAdminRegistration');
				}
			};
		}]);
})();