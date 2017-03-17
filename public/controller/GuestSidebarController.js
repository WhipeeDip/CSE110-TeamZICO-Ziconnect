/**
 * File name: GuestSidebarController.js
 * Authors: Justin Cai, Caris Wei
 * Description: Controller for displaying an event's participants
 */
angular.module('controllers')
  .controller('GuestSidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
      $scope.loadGuests = function(eid) {
        var userRef = firebase.database().ref('eventGuests').child(eid);
        var list = $firebaseArray(userRef);
        $scope.list = list;
        console.log(list);
        console.log(eid);

        var userList = firebase.database().ref("userList");
        var users = $firebaseArray(userList);
        $scope.users = users;
        
        var result = [];
        $scope.result = result;
          
        $scope.users.$loaded().then(function(data) {
          angular.forEach(data, function(val, key) {
            $scope.list.$loaded().then(function(data) {
              angular.forEach(data, function(value, key) {
                if(value.$id === val.uid) {
                  $scope.result.push(val);
                }
              });
            });
          });
        });
      };
      $scope.going=function(){
        console.log("going");
      };
      $scope.maybe=function(){
          
      };
      scope.notGoing=function(){
          
      };
    }
  ]);
