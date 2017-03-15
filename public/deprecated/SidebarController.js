/**
 * File name: GetUsersEventsController.js
 * Authors: Justin Cai
 * Description: Controller for getting user's events in sidebar.
 */


angular.module('controllers')
  .controller('SidebarControllers', ['$rootScope', '$scope', '$firebaseArray',
    function($scope, $firebaseArray){
        
      /*
      var eventRef = firebase.database().ref('eventList');
      var list = $firebaseArray(eventRef);
      $scope.list = list;
      */
      /*
      var eventRef = firebase.database().ref('eventsUserIsIn' + $rootScope.user.uid);
      $scope.list = $firebaseArray(eventRef);
      */
      
    }
  ]);

