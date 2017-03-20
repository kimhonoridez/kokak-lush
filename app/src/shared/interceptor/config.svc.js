/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
 
(function () {
	'use strict';
	
	angular.module('pondManagementSystem')
		.factory('confFactory', function () {
			var item = {};
			
			item.mainUrl = "http://localhost:3000/";
			
			return item;
		});
})();