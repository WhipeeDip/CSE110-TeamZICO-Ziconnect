/**
 * File name: ProfileController.js
 * Authors: Kevan Yang
 * Description: Handles groups
 */

var prfctrl = angular.module('ziconnect');
  prfctrl.controller('ProfileController', ['$scope', '$rootScope', '$firebaseArray',
    function($scope, $rootScope, $firebaseArray) {

      $scope.uid;
      $scope.events;
      var userEvents = firebase.database().ref().child('eventsUserIsIn/' + $rootScope.user.uid);
      $scope.eventList = $firebaseArray(userEvents);

      // initialize the controller uid for later
      $scope.getBasicInfo = function(uidp) {
        $scope.uid = uidp;
      };

      /*$scope.getEvents = function() {
        $scope.events();
        for(var i = 0; i < eventList.length; i++) {
          events.push(eventList[i].eventName);
        }
      };*/

      $scope.getCalendar = function() {

      };

      $scope.getGroups = function() {

      };

      $scope.getFriends = function() {

      };
    }
  ]);
