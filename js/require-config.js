
'use strict';

var root = 				'/extensions/SiWebRisorse/';
var extRoot = 			root + 'js';
var extIncludeRoot =	root + 'include'

var config = {
	host: window.location.hostname,
	prefix: "/",
	port: window.location.port,
	isSecure: window.location.protocol === "https:"
};

require.config({

	baseUrl: 					"/resources",

	paths: {
		'extJs': 				extRoot,
		'extView': 				root + 'views',

		'app':					extRoot + '/app',
		'jquery':				extRoot + '/jquery.min',
	    'bootstrapSelect':		extRoot + '/bootstrap-select.min',
		'bootstrap':			extRoot + '/bootstrap.min',
		'datatables.net':		extRoot + '/jquery.dataTables.min',
		'dataTablesBootstrap':	extRoot + '/dataTables.bootstrap.min',
		'chart':				extRoot + '/Chart.min',
		'fileInput':			extRoot + '/fileinput',
		'chartData': 			extRoot + '/chartData',
		
		'angularRoute':			extIncludeRoot + '/angular-route/angular-route-1.2.15',
		'angularMocks':			extIncludeRoot + '/angular-mocks/angular-mocks',
		'angularBootstrap':		extIncludeRoot + '/angular-ui-bootstrap-bower/ui-bootstrap-tpls-0.12.0',
		'head': 				extIncludeRoot + '/head/head',
		'text':					extIncludeRoot + '/requirejs-text/text'
	},

	shim: {
		'angularRoute': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			exports: 'angular.mock'
		},
		'angularBootstrap': {
			deps: ['angular'],
			exports: 'angularBootstrap'
		},
		'bootstrap': {
            deps: ['jquery']
        },
        'jquery': {
            exports: '$'
        },
		'datatables.net': {
            deps: ['bootstrap','jquery']
        },
		'head': {
			deps: ['jquery'],
			exports: 'head'
		}
	},
	priority: [
		'extJs/main',
		'angular'
	]
});

define( "client.services/grid-service", {} );

require([
	'js/qlik',
	'extJs/main'
	], function(qlik) {
		// Lazy bootstraping of angular modules in order to have enough time to load them
		// all first. This requires the qva-bootstrap="false" attribute on the html tag
		// of the index.html file. Load the mashup module at the same time.
		
		angular.element(document).ready(function() {
			angular.bootstrap(document, ['qlik-angular', 'qlik-mashup-angular-bootstrap']);
		});

	}
);

	

