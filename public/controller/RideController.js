/**
 * File name: RideController.js
 * Authors: Elliot Yoon
 * Description: Controller for rides.
 */

angular.module('controllers')
  .controller('RideController', ['RideServices', '$q', '$scope', '$rootScope', '$firebaseArray',
    function(RideServices, $q, $scope, $rootScope, $firebaseArray) {
      var eventUid = $scope.eventData.$id;

      var ridesRef = firebase.database().ref().child('rides/' + eventUid);
      $scope.ridesList = $firebaseArray(ridesRef);
      $scope.rideHost = $scope.ridesList.$getRecord($rootScope.user.uid) != null;

      // host a new ride
      $scope.hostRide = function() {
        // make sure to return early if not int
        var numSeats = parseInt($scope.numSeatsInput);
        if(isNaN(numSeats)) {
          console.log("Invalid input");
          return;
        }
        RideServices.createRide(eventUid, $rootScope.user.uid, $rootScope.user.name, numSeats)
          .then(function(response) { // success
          // do nothing
        }, function(reason) { // error
          if(reason == 'Exists') {
            alert('You are already hosting a ride!');
          }
        });
      };

      // join an existing ride
      $scope.joinRide = function(driverid) {
        console.log('driver: ' + driverid);
        RideServices.addPassenger($scope.eventData.$id, driverid, $rootScope.user.uid);
      };

      $scope.createRide = function() {
      };
    }
  ]);
