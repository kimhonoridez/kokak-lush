/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
 
(function () {
	'use strict';
	
	angular.module('footer', [])
		.controller('footerCtrl', ['$scope', function ($scope) {
			$scope.year = (new Date()).getFullYear();
		}]);
})();