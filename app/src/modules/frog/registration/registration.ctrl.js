(function () {
	'use strict';

	angular.module('frog')
		.controller('frogRegistrationCtrl', ['$scope', '$state', 'USER_TYPE', function ($scope, $state, USER_TYPE) {
			var vm = this;

			if ($scope.$root.CURRENT_USER_TYPE === USER_TYPE.FROG) {
				vm.isFrog = true;
			}

			vm.register = function () {
				
			};

			vm.clear = function () {
				
			};

			vm.back = function () {
				$state.go('login');
			};
		}]);
})();