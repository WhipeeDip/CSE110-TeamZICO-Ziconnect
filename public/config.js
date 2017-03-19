/**
 * File name: config.js
 * Authors: Elliot Yoon, More
 * Description: Client side routing and controller assignment to pull data from route params. 
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
    controller: 'EventInfoController'
  }).

  when('/:event_id/edit', {
    templateUrl:'../partials/editEvent.html',
    controller: 'EventInfoController'
  }).

  //adding eventId routing specific to each event from sidebar
  when('/:event_id/addPeopleToEvent', {
    templateUrl:'../partials/addPeopleToEvent.html',
    controller: 'EventInfoController'
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
    templateUrl: '../partials/searchEvent.html'
  }).

  when('/events/create', {
    templateUrl: '../partials/newEvent.html'
  });

// grabs the event id from route and loads the correct event from firebase
}]).controller('EventInfoController', function($scope, $routeParams, $firebaseObject) {
  var eventListRef = firebase.database().ref('eventList');
  var eventRef = eventListRef.child($routeParams.event_id);
  var obj = $firebaseObject(eventRef);
  obj.$loaded().then(function() {
    obj.eventDate = new Date(obj.eventDate);
    var dat = new Date();
    var time = obj.eventTime.split(/[\s:]/);
    dat.setHours(time[0]);
    dat.setMinutes(time[1]);
    $scope.eventData.eventTime = dat;
    $scope.eventData = obj;
    var str = $scope.eventData.eventTime.toLocaleTimeString().split(/[\s:]/);
    $scope.timeString = '' + str[0] + ':' + str[1] + str[3];
    console.log($scope.timeString);
  });
  $scope.eventData = obj;
});
