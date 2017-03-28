(function () {
	'use strict';

	angular.module('pond')
		.controller('answerSheetCtrl', ['$scope', '$uibModalInstance', 'data', '$sce', '$timeout', 'QuestionnaireSvc', 'MsgPosterSvc', 'userInfoSvc', 'USER_TYPE', function ($scope, $uibModalInstance, data, $sce, $timeout, QuestionnaireSvc, MsgPosterSvc, userInfoSvc, USER_TYPE) {			
			console.log(data);
			var vm = this;
			var MAX_QUESTIONS = 5;

			vm.questionList = [];
			vm.answerSheet = [];
			vm.origAnswerSheet = [];
			vm.remarkList = [];
			vm.origRemarkList = [];
			vm.score = 0;
			vm.isAdmin = $scope.$root.CURRENT_USER_TYPE === USER_TYPE.ADMIN;

			vm.questionnaireData = undefined;
			vm.editMode = false;
			vm.isCheckMode = data.isChecking === true;
			vm.messages = [];
			
			vm.close = function () {
				$uibModalInstance.dismiss('cancel');
			};

			vm.edit = function () {
				vm.editMode = true;
			};

			vm.cancel = function () {
				vm.answerSheet = angular.copy(vm.origAnswerSheet);
				vm.remarkList = angular.copy(vm.origRemarkList);
				vm.editMode = false;
			};
			
			vm.update = function () {
				if (vm.questionnaireData) {
					// Construct data
					var tmp = {
						answerId: parseInt(vm.questionnaireData.answerId),
						enrolmentId: data.enrolmentId,
						questionId: parseInt(vm.questionnaireData.questionId)
					};

					if ($scope.$root.CURRENT_USER_TYPE === USER_TYPE.ADMIN) {
						// Sanitize Remarks
						/*for (var i = 0; i < vm.remarkList.length; i++) {
							vm.remarkList[i] = $sce.trustAsHtml(vm.remarkList[i]);
						}*/

						tmp.score = vm.score;
						tmp.remark = vm.remarkList;
					}
					else {
						// Sanitize Answer Sheet
						/*for (var i = 0; i < vm.answerSheet.length; i++) {
							vm.answerSheet[i].answer = $sce.trustAsHtml(vm.answerSheet[i].answer);
						}*/

						tmp.answer = vm.answerSheet;
					}

					// Create or Update
					QuestionnaireSvc.submitAnswerSheet(tmp).then(function (res) {
						MsgPosterSvc.successMsgCode('S_000');
						$uibModalInstance.close(true);
					}, function (res) {
						console.log("[ERROR] Create/Update Answer Sheet");

						if (res.data.code) {
							displayError(MsgPosterSvc.getMsg(res.data.code));
						}
					});
				}
				else {
					displayError(MsgPosterSvc.getMsg("AN_E001"));
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

			function autoCreateList (listName, fieldName) {
				for (var i = 0; i < MAX_QUESTIONS; i++) {
					var tempData = {};
					tempData[fieldName] = "";

					vm[listName].push(tempData);
				}
			}

			var frogId = $scope.$root.CURRENT_USER_TYPE === USER_TYPE.ADMIN ? data.frogId : userInfoSvc.getUserInfo().frogId;
			QuestionnaireSvc.getQuestionnaireAndAnswer(data.phaseId, frogId).then(function (res) {
				if (res.data.code === 'SUCCESS') {
					vm.questionnaireData = res.data.result;
					vm.questionList = vm.questionnaireData.questions;
					vm.score = vm.questionnaireData.score || 0;

					// Create Empty Answers
					if (!res.data.result.answer) {
						autoCreateList('answerSheet', 'answer');
					}
					else  {
						vm.answerSheet = vm.questionnaireData.answer;
						vm.origAnswerSheet = vm.questionnaireData.answer;
					}

					// Create Empty Remarks
					if (!res.data.result.remark) {
						autoCreateList('remarkList', 'remark');
					}
					else {
						vm.remarkList = vm.questionnaireData.remark;
						vm.origRemarkList = vm.questionnaireData.remark;
					}
				}
				else {
					// Create empty questions
					for (var i = 0; i < MAX_QUESTIONS; i++) {
						vm.questionList.push({
							question: ""
						});

						vm.answerSheet.push({
							answer: ""
						});

						vm.remarkList.push({
							remark: ""
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