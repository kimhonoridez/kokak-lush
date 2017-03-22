(function () {
	'use strict';

	angular.module('pond')
		.factory('QuestionnaireSvc', ['$http', function ($http) {
			var svc = {};

			svc.getQuestionnaire = function (phaseId) {
				var req = {
                    method: 'GET',
                    url: 'api/pond/phase/' + phaseId + '/questionnaire'
                };

                return $http(req);
			};

			svc.updateQuestionnaire = function (data) {
				var req = {
                    method: 'PUT',
                    url: 'api/pond/phase/questionnaire',
                    data: data
                };

                return $http(req);
			};

			svc.createQuestionnaire = function (data) {
				var req = {
                    method: 'POST',
                    url: 'api/pond/phase/questionnaire',
                    data: data
                };

                return $http(req);
			};

			svc.lockQuestionnaire = function (questionId) {
				var req = {
                    method: 'PUT',
                    url: 'api/pond/phase/questionnaire/' + questionId + '/lock'
                };

                return $http(req);	
			};

			return svc;
		}]);
})();