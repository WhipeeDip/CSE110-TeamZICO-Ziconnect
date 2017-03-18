/**
 * File name: EventSidebarController.js
 * Authors: Justin Cai, Elliot Yoon
 * Description: Controller for getting user's events in sidebar.
 */

angular.module('controllers')
  .controller('EventSidebarController', ['$scope', '$rootScope', '$cookies', '$firebaseArray',
    function($scope, $rootScope, $cookies, $firebaseArray) {

      // grab data on user
      var userUid = $cookies.getObject('user').uid;

      // firebase refs
      var usersEventsRef = firebase.database().ref('eventsUserIsIn').child(userUid);
      var eventListRef = firebase.database().ref('eventList');

      // grab user's events
      var eventUidToIndex = []; // pairs the list index with event uid
      usersEventsRef.on('value', function(eventKeyList) { // get every event user is in
        $scope.list = [];
        eventKeyList.forEach(function(eventKeySnapshot) { // loop through entire list
          if(eventKeySnapshot.val() != 0) { // ignore invited events
            var eventKey = eventKeySnapshot.key; // grab event uid

            // begin matching to actual event
            eventListRef.child(eventKey).once('value').then(function(eventSnapshot) {
              var eventVal = eventSnapshot.val(); // event data
              if(eventVal != null) {
                // build array
                var tmp = { 
                  uid: eventSnapshot.key,
                  eventName: eventVal.eventName,
                  eventDate: eventVal.eventDate
                };
                $scope.list.push(tmp);
                eventUidToIndex[tmp.uid] = $scope.list.length - 1;
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
                var eventIndex = eventUidToIndex[newTmp.uid];
                $scope.list[eventIndex] = newTmp;
                $scope.$apply();
              }
            });
          }
        });
      });

      // handle event removal - TODO UNTESTED
      usersEventsRef.on('child_removed', function(oldChildSnapshot) {
        var oldUid = oldChildSnapshot.key;
        var oldIndex = eventUidToIndex[oldUid];
        $scope.list.splice(oldIndex, 1);
        eventUidToIndex.splice(oldUid, 1);
        $scope.$apply();
      });
    }
  ]);
