
define([
	'js/qlik',
	'app'
], function (qlik, app) {

	app.controller('views/MainCtrl', function ($scope) {

		$scope.app = qlik.openApp('SiWeb Risorse.qvf', config);
		
		
		
	});
	
});