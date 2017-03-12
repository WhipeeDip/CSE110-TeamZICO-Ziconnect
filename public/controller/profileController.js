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

      var uid;

      getBasicInfo = function(uidp) {
        uid = uidp;
      };

      $scope.getEvents = function() {

      };

      $scope.getCalendar = function() {

      };

      $scope.getGroups = function() {
        
      }

      $scope.getFriends = function() {

      };

      $scope.getEmail = function() {
        $scope.getBasicInfo('j9Grhk93PaS7mCDDog5zC0Rl8572');
        return $scope.email;
      };

  }
]);
