/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
 
(function () {
	'use strict';
	
	function httpInterceptor(confFactory) {
		return {
			request: function (config) {
				if (config.url.indexOf('.') < 0) {
					config.url = confFactory.mainUrl + config.url;
				}
				
				return config;
			},
			response: function (res) {
				
				// Do checking for response status here and other possible errors
				if (res.status === 200) {
					//res = res.data;
				}
				
				return res;
			}
		};
	}
	
	angular.module('pondManagementSystem')
		.factory('httpInterceptorFactory', ['confFactory', httpInterceptor])
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('httpInterceptorFactory');
		}]);
})();