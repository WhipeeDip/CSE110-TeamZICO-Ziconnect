/**
 * File name: config.js
 * Authors: TODO
 * Description: TODO
 */

'use strict';

angular.
module("ziconnect").
config(['$routeProvider', '$locationProvider', function($routeProvider) {
    $routeProvider.

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

    when('/events/create', {
        templateUrl: '../partials/newEvent.html',
    });

}])

    .controller('InfoController', function($scope, $routeParams,
      $firebaseObject) {
        var ref = firebase.database().ref('eventList');
        var eventRef = ref.child($routeParams.event_id);
        var obj = $firebaseObject(eventRef);
        $scope.eventData = obj;
    });
