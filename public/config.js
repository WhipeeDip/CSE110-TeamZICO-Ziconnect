/**
 * File name: config.js
 * Authors: TODO
 * Description: TODO
 */

'use strict';

angular.
module("ziconnect").
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
    
  when('/info', {
    templateUrl: '../partials/eventInfo.html'
  }).

  when('/profile', {
    templateUrl: '../partials/profile.html'
  }).

  when('/events/create', {
    templateUrl: '../partials/newEvent.html',
  });

  $locationProvider.hashPrefix('');
}]);
