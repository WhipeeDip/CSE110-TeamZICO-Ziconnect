/**
 * File name: config.js
 * Authors: Elliot Yoon, More
 * Description: Client side routing and controller assignment. 
 */

'use strict';

angular.
module("ziconnect").
config(['$routeProvider', '$locationProvider', function($routeProvider) {
  $routeProvider.

  when('/home', {
    templateUrl: '../partials/home.html'
  }).

  when('/info', {
    templateUrl: '../partials/eventInfo.html'
  }).

  when('/:event_id/info', {
    templateUrl:'../partials/eventInfo.html',
    controller: 'InfoController',
  }).

  when('/:event_id/edit', {
    templateUrl:'../partials/editEvent.html',
    controller: 'InfoController',
  }).

  //adding eventId routing specific to each event from sidebar
  when('/:event_id/addPeopleToEvent', {
    templateUrl:'../partials/addPeopleToEvent.html',
    controller: 'InfoController',
  }).

  when('/profile', {
    templateUrl: '../partials/profile.html'
  }).

  when('/events/addPeopleToEvent', {
    templateUrl: '../partials/addPeopleToEvent.html'
  }).

  when('/events/editEvent', {
    templateUrl: '../partials/editEvent.html'
  }).

  when('/events/comment', {
    templateUrl: '../partials/commentOnEvent.html'
  }).
  

  when('/notifications', {
    templateUrl: '../partials/viewNotifications.html'
  }).
  
  when('/searchEvent', {
    templateUrl: '../partials/searchEvent.html',
  }).

  when('/events/create', {
    templateUrl: '../partials/newEvent.html',
  });
}]).controller('InfoController', function($scope, $routeParams, $firebaseObject) {
  var eventListRef = firebase.database().ref('eventList');
  var eventRef = eventListRef.child($routeParams.event_id);
  var obj = $firebaseObject(eventRef);
  $scope.eventData = obj;
});
