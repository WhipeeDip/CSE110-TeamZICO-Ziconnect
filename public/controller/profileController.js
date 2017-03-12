/**
 * File name: profiletController.js
 * Authors: Kevan Yang
 * Description: Handles groups
 */

//var firebase = require("firebase");
//var database = firebase.database;

var prfctrl = angular.module('ziconnect');
  prfctrl.controller('profileController', ['$scope', '$firebaseArray', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseAuth) {

      $scope.uid;

      // initialize the controller uid for later
      $scope.getBasicInfo = function(uidp) {
        $scope.uid = uidp;
      };

      $scope.getEvents = function() {

      };

      $scope.getCalendar = function() {

      };

      $scope.getGroups = function() {

      };

      $scope.getFriends = function() {

      };
  }
]);
