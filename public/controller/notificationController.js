/**
 * File name: notificationController.js
 * Authors: Kevan Yang
 * Description: Controller for notifications.
 */

angular.module('controllers')
  .controller('NotificationController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
      var userNfcn = firebase.database().ref("notifications");

      $scope.ref;
      $scope.list;
      $scope.notes; // notifications list
      $scope.message = "Accept of Decline your invites!";

      // get list of notifications
      $scope.getNotifications = function(uid) {
        console.log('Getting notifications');
        var location = userNfcn.child(uid);
        var list = $firebaseArray(location);
        $scope.list = list;
        $scope.notes = [];
        var invitedList = [];
        $scope.list.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {
            if(value.name.toLowerCase().includes(($scope.input).toLowerCase())) {
              $scope.notes.push(value);
              invitedList.push(key);
              //$scope.list.remove(key);
            }

          })
        })
        var eventRef = firebase.database().ref('eventList');
        for(i=0; i < invitedList.length; i++) {
          eventRef.child(invitedList[i] + '/eventName')
        }
      }
  }
  ]);
