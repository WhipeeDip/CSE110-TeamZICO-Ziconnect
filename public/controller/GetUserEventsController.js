/**
 * File name: GetUsersEventsController.js
 * Authors: Justin Cai
 * Description: Controller for getting events.
 */


angular.module('app', ['firebase'])
  .controller('Ctrl', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
        
      var eventRef = $firebaseArray(new Firebase ("https://cse110-teamzico-ziconnect-dev.firebaseio.com/userList/" + user.uid));
      $scope.userEvents = $firebaseArray(eventRef);
      /*var query = eventRef.orderByChild("eventDate"); 
      $scope.filteredEvents=$firebaseArray(query);*/
  }
]);
