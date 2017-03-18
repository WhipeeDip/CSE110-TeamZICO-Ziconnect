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
      $scope.list = [];
      usersEventsRef.on('value', function(eventKeyList) {
        eventKeyList.forEach(function(eventKeySnapshot) {
          var eventKey = eventKeySnapshot.key;
          eventListRef.child(eventKey).once('value').then(function(eventSnapshot) {
            var eventVal = eventSnapshot.val();
            if(eventVal != null) {
              console.log('eventVal', eventVal);
              var tmp = {
                uid: eventSnapshot.key,
                eventName: eventVal.eventName,
                eventDate: eventVal.eventDate
              };
              $scope.list.push(tmp);
              $scope.$apply();
            }
          }); 
        });
      });
    }
  ]);
