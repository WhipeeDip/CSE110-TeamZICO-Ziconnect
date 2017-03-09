/**
 * File name: GetUsersEventsController.js
 * Authors: Justin Cai
 * Description: Controller for getting user's events in sidebar.
 */


angular.module('controllers')
  .controller('SidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
        
      var eventRef = firebase.database().ref('eventList');
      var list = $firebaseArray(eventRef);
      $scope.list = list;
      /*$scope.userEvents = $firebaseArray(eventRef);
      var query = eventRef.orderByChild("eventDate"); 
      $scope.filteredEvents=$firebaseArray(query);*/
    }
  ]);
