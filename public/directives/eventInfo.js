/**
 * File name: eventInfo.js
 * Authors: Kevan Yang
 * Description: Edit Event Button
 */
 angular.module('controllers')
 .controller('buttonCtrl', ['$window', function($scope)
 {

   $scope.admin = true;
   // meant to show button if creator is view event
   $scope.init = function(creator) {
     //$scope.creator = true;
     $scope.adimin = creator;
   };
   // goes to edit event page
   $scope.toEditPage = function() {
     console.log($scope.admin);
     //$scope.randomnum++;
     window.location = './editEvent.html';
   };
 }
 ]);
