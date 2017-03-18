/**
 * File name: NotificationController.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Controller for notifications.
 */

angular.module('controllers')
  .controller('NotificationController', ['InviteServices', '$scope', '$rootScope', '$firebaseArray',
    function(InviteServices, $scope, $rootScope, $firebaseArray) {
      var user = $rootScope.user;
      var notificationRef = firebase.database().ref().child('notifications').child(user.uid);
      var eventListRef = firebase.database().ref('eventList');

      // prepare notification array
      var eventUidToIndex = []; // pairs the list index with event uid
      notificationRef.on('value', function(notificationsList) { // grab every notification
        $scope.notes = [];
        notificationsList.forEach(function(notificationSnapshot) { // loop through entire list
          var eventKey = notificationSnapshot.key; // event uid

          // grab real event data
          eventListRef.child(eventKey).once('value').then(function(eventSnapshot) {
            var eventVal = eventSnapshot.val(); // event data
            if(eventVal != null) {
              // build array 
              var tmp = {
                uid: eventSnapshot.key,
                eventName: eventVal.eventName,
                eventDate: eventVal.eventDate
              };
              $scope.notes.push(tmp);
              eventUidToIndex[tmp.uid] = $scope.notes.length - 1;
              $scope.$apply();
            }
          });

          // handle event data changes - TODO UNTESTED
          eventListRef.child(eventKey).on('child_changed', function(childSnapshot, prevChildKey) {
            var eventValChange = childSnapshot.val(); // event data
            if(eventValChange != null) {
              // edit array
              var newTmp = { 
                uid: childSnapshot.key,
                eventName: eventValChange.eventName,
                eventDate: eventValChange.eventDate
              };
              var eventIndex = eventUidToIndex[tmp.uid];
              $scope.notes[eventIndex] = tmp;
              $scope.$apply();
            }
          });
        });
      });

      // handle notification removal
      notificationRef.on('child_removed', function(oldChildSnapshot) {
        var oldUid = oldChildSnapshot.key;
        var oldIndex = eventUidToIndex[oldUid];
        $scope.notes.splice(oldIndex, 1);
        eventUidToIndex.splice(oldUid, 1);
        $scope.$apply();
      });

      // accept invite
      $scope.acceptInvite = function(note) {
        InviteServices.respondToEventInvite(user.uid, note.uid, true);
      };

      // decline invite
      $scope.declineInvite = function(note) {
        InviteServices.respondToEventInvite(user.uid, note.uid, false);
      };
    }
  ]);
