/**
 * Created by davidxlin on 3/11/17.
 */
angular.module('controllers')
  .controller('newEventController', ['$scope', '$firebaseArray', '$location',
    function($scope, $firebaseArray, $location) {
        var eventRef = firebase.database().ref('eventList');
        $scope.newEvent = {};
        $scope.createEvent = function() {

          var evTime = new Date($scope.event.eventTime);
          evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          console.log(evTime);
          var newEvent = {
              eventName: $scope.event.eventName,
              eventLocation: $scope.event.eventLocation,
              eventTime: evTimeString,
              eventDate: $scope.event.eventDate.toDateString(),
              eventDescription: $scope.event.eventDescription,
              eventPotluck: true
          };
          // $scope.event.eventTime = $scope.event.eventTime.toLocaleTimeString();
          // $scope.event.eventDate = $scope.event.eventDate.toDateString();
          console.log(newEvent);

          eventRef.push(newEvent);

          $location.path('/home');
      }
    }
  ]);