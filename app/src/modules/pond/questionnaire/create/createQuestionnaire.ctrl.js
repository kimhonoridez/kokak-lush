(function () {
	'use strict';

	angular.module('pond')
		.controller('createQuestionnaireCtrl', ['$scope', '$uibModalInstance', 'data', '$sce', '$timeout', 'QuestionnaireSvc', 'MsgPosterSvc', function ($scope, $uibModalInstance, data, $sce, $timeout, QuestionnaireSvc, MsgPosterSvc) {			
			console.log(data);
			var vm = this;
			var MAX_QUESTIONS = 5;

			vm.questionList = [];
			vm.origQuestionList = [];

			vm.questionnaireData = undefined;
			vm.editMode = false;
			vm.messages = [];
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};

			vm.edit = function () {
				vm.editMode = true;
			};

			vm.cancel = function () {
				vm.questionList = angular.copy(vm.origQuestionList);
				vm.editMode = false;
			};

			vm.lock = function () {
				// Lock
				QuestionnaireSvc.lockQuestionnaire(vm.questionnaireData.questionId).then(function (res) {
					MsgPosterSvc.successMsgCode('S_000');
					$uibModalInstance.close(true);
				}, function (res) {
					if (res.data.code) {
						displayError(MsgPosterSvc.getMsg(res.data.code));
					}
				});
			};
			
			vm.update = function () {

				// Sanitize input
				for (var i = 0; i < vm.questionList.lengt; i++) {
					vm.questionList[i] = $sce.trustAsHtml(vm.questionList[i]);
				}

				// Construct data
				var tmp = {
					phaseId: data.phaseId,
					questions: vm.questionList
				};

				if (vm.questionnaireData) {
					tmp.questionId = vm.questionnaireData.questionId;

					// Update
					QuestionnaireSvc.updateQuestionnaire(tmp).then(function (res) {
						MsgPosterSvc.successMsgCode('S_000');
						$uibModalInstance.close(true);
					}, function (res) {
						if (res.data.code) {
							displayError(MsgPosterSvc.getMsg(res.data.code));
						}
					});
				}
				else {
					// Create
					QuestionnaireSvc.createQuestionnaire(tmp).then(function (res) {
						MsgPosterSvc.successMsgCode('S_000');
						$uibModalInstance.close(true);
					}, function (res) {
						console.log("[ERROR] create questionnaire");

						if (res.data.code) {
							displayError(MsgPosterSvc.getMsg(res.data.code));
						}
					});
				}
			};


			function displayError(msg) {
				vm.messages.push(msg);
				
				$timeout(function () {
					if (vm.messages.length) {
						vm.messages.shift();
					}
				}, 1500);
			}

			QuestionnaireSvc.getQuestionnaire(data.phaseId).then(function (res) {
				if (res.data.code === 'SUCCESS') {
					vm.questionnaireData = res.data.result;
					vm.questionList = vm.questionnaireData.questions
				}
				else {
					// Create empty questions
					for (var i = 0; i < MAX_QUESTIONS; i++) {
						vm.questionList.push({
							question: ""
						});
					}
				}

				vm.origQuestionList = angular.copy(vm.questionList);
			}, function () {
				MsgPosterSvc.errorMsgCode('E_000');
				$uibModalInstance.dismiss('cancel');
			});
		}])
})();