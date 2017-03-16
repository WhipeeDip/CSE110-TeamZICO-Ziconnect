/**
 * File name: EventSidebarController.js
 * Authors: Justin Cai
 * Description: Controller for getting user's events in sidebar.
 */

angular.module('controllers')
  .controller('EventSidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
      
      $scope.getUser = function() {
        $scope.user = AccountServices.getUser();
      };
      
      // grabs the events that the user is in by filtering through:
      //    eventsUserIsIn
      //    eventList
      $scope.getUserEvents = function(uid) {
        console.log("its working not really " + uid);
        var eventRef = firebase.database().ref('eventList');
        var eUserIsInRef = firebase.database().ref('eventsUserIsIn').child(uid);
      };
      
      var eventRef = firebase.database().ref('eventList');
      var list = $firebaseArray(eventRef);
      $scope.list = list;
      /*$scope.userEvents = $firebaseArray(eventRef);
      var query = eventRef.orderByChild("eventDate"); 
      $scope.filteredEvents=$firebaseArray(query);*/
    }
  ]);
