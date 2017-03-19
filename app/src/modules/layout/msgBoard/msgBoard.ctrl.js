/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
 
(function () {
	'use strict';
	
	angular.module('msgBoard', [])
		.controller('msgBoardCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
			$scope.messages = [];
			
			$scope.$on('postMsg', function (e, data) {
				$scope.messages.push(data);
				
				$timeout(function () {
					if ($scope.messages.length) {
						$scope.messages.shift();
					}
				}, 5000);
			});
		}]);
})();