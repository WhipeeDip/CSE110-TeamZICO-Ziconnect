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
          reason = "";
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
        //$scope.isinRide();
        if($scope.searchRider(driverid)) {
        RideServices.addPassenger($scope.eventData.$id, driverid, $rootScope.user.uid, $rootScope.user.name);
        }
        else {
          console.log("Cannot join (see above)");
          return;
        }
      };

      $scope.createRide = function() {
      };

      // search for rider to seee if they're already in a ride
      $scope.searchRider = function(driverid) {
        var ride = ridesRef.child(driverid).child('passengers');
        var rList = $firebaseArray(ride);
        var curr;
        // search all passengers
        console.log(rList.length);
        for(var i = 0; i < rList.length; i++) {
          console.log(i);
          curr = rList[i];
          if(curr.uid == $rootScope.user.uid) {
            console.log('You are already a passenger in the ride');
            return true;
          }
        }
        return false;
      };

      $scope.$watch('numSeatsInput', function(newVal, oldVal) {
     
        if(newVal.length > 2) {       
          $scope.numSeatsInput = oldVal;
        }
   
      });

      // search in all the rides
      // iterate through all riders and search for the user
      /*
      $scope.isinRide = function() {
        console.log('Searching...');
        var driverList = $firebaseArray(ridesRef);
        var curr;
        var driverid;
        for(var i = 0; i< driverList.length; i++) {
          curr = rList[i];
          driverid = curr.driverName;
          console.log(curr.driverName);
          console.log(i);


        }
      };*/

    }
  ]);
