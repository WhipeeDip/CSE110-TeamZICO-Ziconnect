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

  when('/:event_name/info', {
    templateUrl:'../partials/eventInfo.html',
    controller: 'InfoController',
    controllerAs: 'app'
  }).

  when('/profile', {
    templateUrl: '../partials/profile.html'
  }).

  when('/events/create', {
    templateUrl: '../partials/newEvent.html',
  });

}])

.controller('InfoController', function($routeParams) {
  var self = this;
  self.message = $routeParams.event_name;
});