/**
 * File name: GetUsersEventsController.js
 * Authors: Justin Cai
 * Description: Controller for getting events.
 */


angular.module('controllers')
  .controller('SidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
        
      var eventRef = firebase.database().ref('userList');
      var list = $firebaseArray(eventRef);
      $scope.list = list;
      /*$scope.userEvents = $firebaseArray(eventRef);
      var query = eventRef.orderByChild("eventDate"); 
      $scope.filteredEvents=$firebaseArray(query);*/
    }
  ]);
