/**
 * File name: FoodController.js
 * Authors: Kevan Yang, Justin Cai
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
   $scope.suggestion = '';
   $scope.fooditem = '';

   //$scope.foodList = [];
   // should be [food, uid]
   var foodPair = [];
   $scope.storeFood = function(name, uid, food) {
     potluckRef.child(food).set({
       'UID': uid,
       'name': name,
       'food': food
     });

   };

   $scope.storeSuggestion = function(food) {
     suggestRef.child(food).set({
         'food': food
     })
     /* suggestRef.push({
       'food': food
     })*/
   }
   
   $scope.claimSuggestion=function(name, uid, food){

    console.log("claiming " + food)
    $scope.storeFood(name, uid, food);
    suggestRef.child(food).remove();   
   }
   
   $scope.removeFood = function(food){
       console.log('removing '+food)
     //removing food item from potluck list
     firebase.database().ref('potluck').child(eventUid).child(food).remove()
   }

   $scope.$watch('suggestion', function(newVal, oldVal) {
     if(newVal.length > 40) {       
       $scope.suggestion = oldVal;
     }
   });

   $scope.$watch('fooditem', function(newVal, oldVal) {
     if(newVal.length > 30) {       
       $scope.fooditem = oldVal;
     }
   });

 }]);
