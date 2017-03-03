 'use strict';

 angular.
 module("ziconnect").
 config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    
    when('/info', {
      templateUrl: 'eventInfo.html'
    }).

    when('/events/create', {
    	templateUrl: 'newEvent.html',
    });

    $locationProvider.hashPrefix('');
 }]);
