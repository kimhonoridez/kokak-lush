/**
 * @author Kim Honoridez
 * @version 0.0.1
 */
 
(function () {
	'use strict';
	
	angular.module('msgPoster', [])
		.factory('MsgPosterSvc', ['MsgType', '$rootScope', '$http', function (MsgType, $rootScope, $http) {
			var item = {};
			var msgList = {};
			
			item.successMsg = function(msg) {
				$rootScope.$broadcast('postMsg', {
					type: MsgType.SUCCESS, 
					content: msg
				});
			};
			
			item.errorMsg = function(msg) {
				$rootScope.$broadcast('postMsg', {
					type: MsgType.ERROR, 
					content: msg
				});
			};
			
			item.warnMsg = function(msg) {
				$rootScope.$broadcast('postMsg', {
					type: MsgType.WARN, 
					content: msg
				});
			};
			
			item.infoMsg = function(msg) {
				$rootScope.$broadcast('postMsg', {
					type: MsgType.INFO, 
					content: msg
				});
			};

			item.successMsgCode = function(code) {
				if (msgList[code]) {
					$rootScope.$broadcast('postMsg', {
						type: MsgType.SUCCESS, 
						content: msgList[code]
					});
				}
			};
			
			item.errorMsgCode = function(code) {
				if (msgList[code]) {
					$rootScope.$broadcast('postMsg', {
						type: MsgType.ERROR, 
						content: msgList[code]
					});
				}
			};
			
			item.warnMsgCode = function(code) {
				if (msgList[code]) {
					$rootScope.$broadcast('postMsg', {
						type: MsgType.WARN, 
						content: msgList[code]
					});
				}
			};
			
			item.infoMsgCode = function(code) {
				if (msgList[code]) {
					$rootScope.$broadcast('postMsg', {
						type: MsgType.INFO, 
						content: msgList[code]
					});
				}
			};

			item.init = function () {
				$http.get('app/src/shared/msgPoster/messages.en.json').then(function (res) {
					msgList = res.data;
				});
			};

			item.getMsg = function (code) {
				return msgList[code];
			};
			
			return item;
		}]);
})();