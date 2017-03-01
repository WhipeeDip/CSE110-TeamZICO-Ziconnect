 'use strict';

 angular.
 module("ziconnect").
 config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    
    when('/info', {
      templateUrl: 'eventInfo.html'
    }).

    when('/events/create', {
    	templateUrl: 'newEvent.html',
    });
 }]);
