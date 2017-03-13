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
        console.log('UID: '+uid);
        var location = userNfcn.child(uid);
        var list = $firebaseArray(location);
        $scope.list = list;
        $scope.notes = [];
        var invitedList = [];
        //var eventRef = firebase.database().ref('eventList');
        $scope.list.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {
            //$scope.notes.push(value);
            console.log(value.$id);
            invitedList.push(value.$id);
            var eventRef = firebase.database().ref('eventList/' + value.$id);
            //console.log('eventRef: ' +eventRef);
            eventRef.once('value').then(function(snapshot) {
              var name = snapshot.val().eventName;
              console.log(name);
              $scope.notes.push(name);
            });
          })

        }); // why does it stop here?
      }
  }
  ]);
