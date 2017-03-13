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
          
        var list = $firebaseArray(           userRef);
        $scope.list = list;
        console.log($scope.input);
          
        var res = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().search(($scope.input).toLowerCase) != -1) {
                res.push(list[i]);
            }
        }
          console.log("res");
          console.log(res);
      }
    }
  ]);
