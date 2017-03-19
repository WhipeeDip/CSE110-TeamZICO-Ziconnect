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
        var file = document.getElementById("eventImage").files[0];
        var size = document.getElementById("eventImage").files.length;

        var eImage;
        if(size > 0) {
          eImage = file.name;
        } else {
          eImage = "none";
        }
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
          eventRides: $scope.rides,
          eventImage: eImage,
        };

        // if box was never checked
        if(newEvent.eventPotluck == null) {
          newEvent.eventPotluck = false;
        };
        if(newEvent.eventRides == null) {
          newEvent.eventRides = false;
        };

        console.log('Creating a new event object:', newEvent);

        // new key for the new event
        var eventKey = eventListRef.push(newEvent).key;
        console.log('New event UID: ' + eventKey);

        // adding the user as the admin in the eventGuests list
        var guestRef = firebase.database().ref('eventGuests');
        guestRef.child(eventKey).child(userUid).set(4); // TODO: let's avoid super ambiguous magic
        // OKAY, so 4 means admin/creator for now. TODO TODO TODO magic numbers

        // pushing the events into the list of events a user is in
        var uEventsRef = firebase.database().ref('eventsUserIsIn');
        uEventsRef.child(userUid).child(eventKey).set(4); // I'm just mirroring whatever that number is above

        // upload the file to firebase storage
        if (size > 0 ) {
            var storageRef = firebase.storage().ref('images/');
            storageRef.child('' + eventKey + '/' + file.name).put(file).then(function (snapshot) {
                console.log('Uploaded a picture to eventID');
            });
        }

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
            eventRides: $scope.eventData.eventRides,
        };
        console.log('New edited event:', newEvent);
        console.log('Potluck edit: ' + $scope.potluck);

        if(newEvent.eventPotluck == null) {
          newEvent.eventPotluck = false;
        };
        if(newEvent.eventRides == null) {
          newEvent.eventRides = false;
        };

        thisEventRef.update(newEvent);

        $location.path('/' + $scope.eventData.$id + '/info');
      };

      // searches for events from the search bar
      $scope.searchEvent = function() {
        var eventListRef = firebase.database().ref('eventList');
        $scope.events = $firebaseArray(eventListRef);
        console.log(eventListRef);

        var found = [];
        $rootScope.found = found;

        $scope.events.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {  if(value.eventName.toLowerCase().includes(($scope.input).toLowerCase())) {
              $rootScope.found.push(value);
            }
          })
        })
        console.log(found);
      };

      $scope.loadImage = function() {
        var storageRef= firebase.storage();
        var pathRef = storageRef.ref('images/' + $scope.eventData.$id +'/');

        console.log($scope.eventData);

        $scope.eventData.$loaded().then(function() {
          console.log($scope.eventData.eventImage);
          if($scope.eventData.eventImage !== "none") {
              pathRef.child('' + $scope.eventData.eventImage).getDownloadURL().then(function (url) {
                  var urlString = 'url(' + url + ')';
                  document.getElementById('cover').style.backgroundImage = urlString;
              });
          }
        });
      }
    }
  ]);
