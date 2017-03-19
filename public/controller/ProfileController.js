/**
 * File name: ProfileController.js
 * Authors: Kevan Yang, Elliot Yoon
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
    }
  ]);
