(function () {
	'use strict';

	angular.module('modules', [
		'login',
		'layout',
		'admin', // pond admin CRUD
		'pond', // pond, phases, questionaire
		'frog',
		'enrolment',
		'dashboard'
	]);
})();