/**
 * File name: GetUsersEventsController.js
 * Authors: Justin Cai
 * Description: Controller for getting user's events in sidebar.
 */


angular.module('controllers')
  .controller('InviteController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
        
      var eventRef = firebase.database().ref('userList');
      var list = $firebaseArray(eventRef);
      $scope.list = list;

    }
  ]);
