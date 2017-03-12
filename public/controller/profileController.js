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

      $scope.email;
      $scope.test = "here";

      $scope.getBasicInfo = function(uid) {
        var ref = firebase.database().ref();
        var list = $firebaseArray(ref);
        ref = firebase.database().ref('userList/' + uid);
        list = $firebaseArray(ref);
        email = list.$getRecord(email);
        return email;

      };

      $scope.getEvents = function() {

      };

      $scope.getCalendar = function() {

      };

      $scope.getFriends = function() {

      };

      $scope.getEmail = function() {
        $scope.getBasicInfo();
        return $scope.email;
      };

  }
]);
