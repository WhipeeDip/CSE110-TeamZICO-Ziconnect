/**
 * File name: EventController.js
 * Authors: Elliot Yoon, David Lin, Caris Wei, Christian Cheng
 * Description: Controls events.
 */

angular.module('controllers')
  .controller('EventController', ['$scope', '$rootScope', '$firebaseArray', '$location',
    function($scope, $rootScope, $firebaseArray, $location) {

      var eventListRef = firebase.database().ref('eventList');
      $scope.newEvent = {};

      $scope.createEvent = function(userUid) {

        var evTime = new Date($scope.eventTime);
        evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        var newEvent = {
          eventName: $scope.eventName,
          eventLocation: $scope.eventLocation,
          eventTime: evTimeString,
          eventSortDate: $scope.eventDate.getTime(),
          eventDate: $scope.eventDate.toDateString(),
          eventDescription: $scope.eventDescription,
          eventPotluck: $scope.potluck,
        };

        // if box was never checked
        if(newEvent.eventPotluck == null) {
          newEvent.eventPotluck = false;
        };

        console.log('Creating a new event object:', newEvent);

        // new key for the new event
        var eventKey = eventListRef.push(newEvent).key;
        console.log('Event UID: ' + eventKey);

        // adding the user as the admin in the eventGuests list
        var guestRef = firebase.database().ref('eventGuests');
        guestRef.child(eventKey).child(userUid).set(4); // TODO: let's avoid super ambiguous magic

        // pushing the events into the list of events a user is in
        var uEventsRef = firebase.database().ref('eventsUserIsIn');
        uEventsRef.child(userUid).child(eventKey).set(4); // I'm just mirroring whatever that number is above

        // user is sent to the home page with the info of the newly created event displayed
        $location.path('/' + eventKey + '/info');
      };

      $scope.editEvent = function() {
        var thisEventRef = firebase.database().ref('eventList/' + $scope.eventData.$id);

        var evTime = new Date($scope.eventData.eventTime);
        evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        var newEvent = {
            eventName: $scope.eventData.eventName,
            eventLocation: $scope.eventData.eventLocation,
            eventTime: evTimeString,
            eventDate: $scope.eventData.eventDate.toDateString(),
            eventDescription: $scope.eventData.eventDescription,
            eventPotluck: $scope.eventData.eventPotluck,
        };
        console.log('New edited event:', newEvent);
        console.log('Potluck edit: ' + $scope.potluck);

        if(newEvent.eventPotluck == null) {
          newEvent.eventPotluck = false;
        }

        thisEventRef.update(newEvent);

        $location.path('/' + $scope.eventData.$id + '/info');
      };

      // searches for events from the search bar
      $scope.searchEvent = function() {
        var eventListRef = firebase.database().ref('eventList');
        $scope.events = $firebaseArray(eventListRef);
        console.log(eventListRef);

        var found = [];
        $scope.found = found;

        $scope.events.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {
            if(value.eventName.toLowerCase().includes(($scope.input).toLowerCase())) {
              $scope.found.push(value);
            }
          })
        })
        console.log(found);
      };
    }
  ]);
