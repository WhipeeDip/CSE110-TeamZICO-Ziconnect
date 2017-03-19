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
      usersEventsRef.on('value', function(eventKeyList) { // get every event user is in
        $scope.list = [];
        eventKeyList.forEach(function(eventKeySnapshot) { // loop through entire list
          if(eventKeySnapshot.val() != 0) { // ignore invited events
            var eventKey = eventKeySnapshot.key; // grab event uid
            var init = false;

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
                $scope.$apply();
                init = true;
              }
            });

            // begin matching to actual event
            eventListRef.child(eventKey).on('value', function(eventSnapshot) {
              var eventVal = eventSnapshot.val(); // event data
              if(eventVal != null && init) {
                // build array
                var tmp = { 
                  uid: eventSnapshot.key,
                  eventName: eventVal.eventName,
                  eventDate: eventVal.eventDate
                };
                $scope.list.push(tmp);
              }
            });
          }
        });
      });

    }
  ]);
