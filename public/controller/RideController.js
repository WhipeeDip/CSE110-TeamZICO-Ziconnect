/**
 * File name: RideController.js
 * Authors: Elliot Yoon
 * Description: Controller for rides.
 */

angular.module('controllers')
  .controller('RideController', ['RideServices', '$q', '$scope', '$rootScope', '$firebaseArray',
    function(RideServices, $q, $scope, $rootScope, $firebaseArray) {
      var user = $rootScope.user;
      var eventUid = $scope.eventData.$id;
      $scope.numSeatsInput = '';

      var ridesRef = firebase.database().ref().child('rides/' + eventUid);
      $scope.ridesList = $firebaseArray(ridesRef);
      $scope.rideHost = $scope.ridesList.$getRecord(user.uid) != null;
      $scope.ridesList.$loaded().then(function(x) {
        var hasRidesRef = ridesRef.child('hasRides');
        $scope.ridesList.$remove($scope.ridesList.$getRecord('hasRides')).then(function(ref) {
          //
        }).catch(function(remerror) {
          //
        });
      }).catch(function(error) {
        //
      });

      // host a new ride
      $scope.hostRide = function() {
        // make sure to return early if not int
        var numSeats = parseInt($scope.numSeatsInput);
        if(isNaN(numSeats)) {
          alert('You entered an invalid number!');
          $scope.numSeatsInput = '';
          return;
        }
        RideServices.createRide(eventUid, user.uid, user.name, numSeats)
          .then(function(response) { // success
          $scope.numSeatsInput = '';
        }, function(reason) { // error
          if(reason == 'Exists') {
            alert('You are already hosting a ride!');
          }
        });
      };

      // join an existing ride
      $scope.joinRide = function(driverid) {
        RideServices.addPassenger(eventUid, driverid, user.uid, user.name).then(function(success) {
          // none
        }, function(reason) {
          if(reason == 'Exists') {
            alert('You are already in a ride!');
          } else if(reason == 'full') {
            alert('This ride is full!');
          }
        });
      };

      $scope.$watch('numSeatsInput', function(newVal, oldVal) {
     
        if(newVal.length > 2) {       
          $scope.numSeatsInput = oldVal;
        }
   
      });
    }
  ]);
