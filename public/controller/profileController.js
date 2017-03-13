/**
 * File name: groupListController.js
 * Authors: Kevan Yang
 * Description: Handles groups
 */

//var firebase = require("firebase");
//var database = firebase.database;

var prfctrl = angular.module('controllers');
  prfctrl.controller('profileController', ['$scope', '$key', '$firebaseArray',
    function($scope, $key, $firebaseArray) {

      $scope.getBasicInfo = function() {
        return "info";

      };

      $scope.getEvents = function() {

      };

      $scope.getCalendar = function() {

      };

      $scope.getFriends = function() {

      };

      $scope.Events = function() {

      }

  }
]);
