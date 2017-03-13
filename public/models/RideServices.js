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
        createRide: function() {
          var deferred = $q.defer();

          var ridesRef = firebase.database().ref().child('rides');
          var pushPromise = groupListsRef.push({'creator': creatorUid});
          pushPromise.then(function() {
            console.log('New group created:', pushPromise.key);
            deferred.resolve();
          })

          return deferred.promise;
        },

        // adds a passenger to an existing ride
        addPassenger: function() {

        },

        // deletes an existing ride
        deleteRide: function() {

        }
      }
    }
  ]);
