/**
 * File name: NotificationController.js
 * Authors: Kevan Yang
 * Description: Controller for notifications.
 */

angular.module('controllers')
  .controller('NotificationController', ['$scope', '$rootScope', '$firebaseArray',
    function($scope, $rootScope, $firebaseArray){
      var userNfcn = firebase.database().ref("notifications/" + $rootScope.user.uid);

      const accept = 1; // constant to indicate user has accepted for guestlist

      $scope.ref;
      $scope.list;
      $scope.notes = $firebaseArray(userNfcn); // notifications list
      $scope.message = "Accept of Decline your invites!";

      // respond to notifications
      $scope.view = function (note) {
        //var gListRef = firebase.database().ref("eventGuests/");
        //gListRef.child(note.eventID).child($rootScope.user.uid).set(accept);
        //need to route to event page
        $scope.notes.$remove(note);
      };

      $scope.dismiss = function(note) {
        //remove this notification
        $scope.notes.$remove(note);
      };
    }
  ]);
