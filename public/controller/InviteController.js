/**
 * File name: InviteController.js
 * Authors: Justin Cai, Caris Wei
 * Description: Controller for adding people to event
 */

angular.module('controllers')
  .controller('InviteController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
      var userRef = firebase.database().ref("userList");
      console.log(userRef);
      $scope.input = null;
        
      $scope.inviteFunc = function(){
        var list = $firebaseArray(userRef);
        $scope.list = list;
        
        var users = [];
        $scope.users = users;
          
        $scope.list.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {
            if(value.name.toLowerCase().includes(($scope.input).toLowerCase())) {
              $scope.users.push(value);
            }

          })
        })
      }}
  ]);
