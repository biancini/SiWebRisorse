define([
	'js/qlik',
	'app',
	'jquery',
	'bootstrapSelect',
	'bootstrap',
	'datatables.net',
	'dataTablesBootstrap',
	'chart',
	'fileInput',
	'chartData'
], function (qlik, app) {
	app.controller('views/MainCtrl', function ($scope) {
		$scope.app = qlik.openApp('SiWeb Risorse.qvf', config);
		
		$scope.assunti_currentmonth = -1;
		$scope.app.createCube({
			qDimensions: [ ],
			qMeasures: [{
				qDef: { qDef: 'count({<GenericDate={"$(=max(GenericDate))"}, FLG_DISPONIBILE={1}, _Active={1}>} DISTINCT ID_RISORSA)' }
			}],
			qInitialDataFetch: [{
				qHeight: 1000,
				qWidth: 5
			}]
		}, function (reply) {
			$.each(reply.qHyperCube.qDataPages[0].qMatrix, function (index, value) {
				if (value[0] != null && value[0].qNum != "NaN") {
					$scope.assunti_currentmonth = value[0].qNum;
				}
			});
		});
		
		$(document).ready(function() {
			// Line chart from swirlData for dashReport
			var ctx = document.getElementById("dashReport").getContext("2d");
			window.myLine = new Chart(ctx).Line(swirlData, {
				responsive: true,
				scaleShowVerticalLines: false,
				scaleBeginAtZero : true,
				multiTooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
			}); 
			
			// Pie Chart from doughutData
			var doctx = document.getElementById("chart-area3").getContext("2d");
			window.myDoughnut = new Chart(doctx).Pie(doughnutData, {responsive : true});

			// Dougnut Chart from doughnutData
			var doctx = document.getElementById("chart-area4").getContext("2d");
			window.myDoughnut = new Chart(doctx).Doughnut(doughnutData, {responsive : true});

		});
	});
});