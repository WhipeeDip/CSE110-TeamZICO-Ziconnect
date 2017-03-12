/**
 * File name: eventInfo.js
 * Authors: Kevan Yang
 * Description: Edit Event Button
 */
 var btnctrl = angular.module('controllers');
 btnctrl.controller('buttonCtrl', ['$window', function($scope)
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
     window.location = '../partials/editEvent.html';
   };
   $scope.toInvitePage = function() {
     window.location = '../partials/addPeopletoEvent.html';
   }
 }
]);
