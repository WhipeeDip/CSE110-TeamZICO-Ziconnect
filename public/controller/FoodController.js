/**
 * File name: FoodController.js
 * Authors: Kevan Yang
 * Description: Handles food to be brought to event, if potluck mode
 */

 var foodctrl = angular.module('controllers');
 foodctrl.controller('FoodController', ['$scope', '$rootScope', '$firebaseArray',
 function($scope, $rootScope, $firebaseArray) {

   var eventUid = $scope.eventData.$id;

   var potluckRef = firebase.database().ref().child('potluck/' + eventUid);
   var suggestRef = firebase.database().ref().child('potluck/suggestions/' + eventUid);
   $scope.foodList = $firebaseArray(potluckRef);
   $scope.suggestionList = $firebaseArray(suggestRef);

   //$scope.foodList = [];
   // should be [food, uid]
   var foodPair = [];
   $scope.storeFood = function(name, uid, food) {
     potluckRef.push({
       'UID': uid,
       'name': name,
       'food': food
     });

   };

   $scope.storeSuggestion = function(food) {
     suggestRef.push({
       'food': food
     })
   }
 }]);
