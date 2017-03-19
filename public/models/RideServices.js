/**
 * File name: RideServices.js
 * Authors: Elliot Yoon
 * Description: Handles rides on events.
 */

angular.module('models')
  .factory('RideServices', ['$q',
    function($q) {
      return {

        // creates a new ride
        createRide: function(eventUid, creatorUid, creatorName, numSeats) {
          var deferred = $q.defer();

          var ridesRef = firebase.database().ref().child('rides/' + eventUid + '/' + creatorUid);
          ridesRef.once('value').then(function(snapshot) {
            // ride already exists
            if(snapshot.exists()) {
              deferred.reject('Exists');
            } else {
              /*ridesRef.push( {
                driverName: creatorName,
                seats: numSeats,
              });*/
              //ridesRef.child('seats').set(numSeats);
              ridesRef.child('driverName').set(creatorName);

              ridesRef.set({'seats': numSeats}).then(function() {
                console.log('Ride created with driver ' + creatorUid);
                ridesRef.child('driverName').set(creatorName);
                ridesRef.child('passengers').set('');
                deferred.resolve();
              });
            }
          });

          return deferred.promise;
        },

        // adds a passenger to an existing ride
        addPassenger: function(eventUid, creatorUid, userUid, username) {
          var deferred = $q.defer();

          console.log(eventUid);
          console.log(creatorUid);
          console.log(userUid);
          var ridesRef = firebase.database().ref('rides').child(eventUid).child(creatorUid);
          var hasRidesRef = firebase.database().ref('rides').child(eventUid).child('hasRides').child(userUid);
          var seatsRef = ridesRef.child('seats');

          // check seats
          hasRidesRef.once('value').then(function(hasSnapshot) {
            var exists = hasSnapshot.exists();
            if(exists) {
              deferred.reject('Exists');
            } else {
              seatsRef.once('value').then(function(snapshotSeats) {
                var seats = snapshotSeats.val();
                if(seats <= 0) {
                  console.log('No more seats!');
                  deferred.reject('Full');
                } else {
                  seatsRef.set(seats - 1).then(function() {
                    ridesRef.child('passengers').child(userUid).set(username).then(function() {
                      hasRidesRef.set(true).then(function() {
                        console.log('Added passenger: ' + userUid);
                        deferred.resolve();
                      });
                    });
                  });
                }
              });
            }
          });
          
          return deferred.promise;
        },

        // removes a passenger from an existing ride
        removePassenger: function(creatorUid, userUid) {
          var deferred = $q.defer();

          var ridesRef = firebase.database().ref().child('rides/' + eventUid + '/' + creatorUid);
          var seatsRef = ridesRef.child('seats');

          // check seats
          seatsRef.once('value').then(function(snapshotSeats) {
            var seats = snapshotSeats.val();
            var passengerRef = ridesRef.child(userUid);
            passengerRef.remove().then(function() {
              seatsRef.set(seats + 1).then(function() {
                console.log('Removed passenger: ' + userUid);
                deferred.resolve();
              });
            });
          });

          return deferred.promise();
        },

        // deletes an existing ride
        deleteRide: function(creatorUid) {
          var deferred = $q.defer();

          var ridesRef = firebase.database().ref().child('rides/' + eventUid + '/' + creatorUid);
          ridesRef.remove().then(function() {
            console.log('Removed ride: ', creatorUid);
            deferred.resolve();
          });

          return deferred.promise;
        },


      }
    }
  ]);
