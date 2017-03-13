/**
 * Created by davidxlin on 3/11/17.
 */
angular.module('controllers')
  .controller('newEventController', ['$scope', '$firebaseArray', '$location',
    function($scope, $firebaseArray, $location) {
        var eventRef = firebase.database().ref('eventList');
        $scope.newEvent = {};
        $scope.createEvent = function() {

          var evTime = new Date($scope.eventTime);
          evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          console.log(evTime);
          var newEvent = {
              eventName: $scope.eventName,
              eventLocation: $scope.eventLocation,
              eventTime: evTimeString,
              eventDate: $scope.eventDate.toDateString(),
              eventDescription: $scope.eventDescription,
              eventPotluck: true
          };

          console.log(newEvent);

          eventRef.push(newEvent);

          $location.path('/home');
      }
    }
  ]);