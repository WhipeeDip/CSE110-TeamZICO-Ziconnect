/**
 * File name: InviteServices.js
 * Aurhors: Elliot YOon
 * Description: Service for inviting people.
 */

angular.module('models')
  .factory('InviteServices', ['$q', '$firebaseArray',
    function($q, $firebaseArray) {
      return {

        // searches for a user
        // the second parameter is a uid that contains the uid of a user to remove
        searchUser: function(input, excludeUser) {
          var deferred = $q.defer();

          // firebase refs
          var userListRef = firebase.database().ref('userList');
          var userList = $firebaseArray(userListRef);

          // return array
          var users = [];

          userList.$loaded().then(function(data) {
            angular.forEach(data, function(value, key) {
              if(value.uid != excludeUser &&
                value.name.toLowerCase().includes((input).toLowerCase())) {
                users.push(value);
              }
            });
            deferred.resolve(users);
          });

          return deferred.promise;
        },

        // invites a user to an event
        // NOTE and TODO: magic number 0 means invited but no response 
        inviteUserToEvent: function(userUid, eventUid) {
          var deferred = $q.defer();

          // firebase refs
          var eventGuestsRef = firebase.database().ref('eventGuests').child(eventUid).child(userUid);

          // first check if invited
          eventGuestsRef.once('value').then(function(snapshot) {
            // user is already in the event (we don't care about status)
            if(snapshot.exists()) {
              console.log('User already is in event!');
              deferred.reject('exists');
            } else { // begin invite logic
              // firebase refs
              var eventsUserIsInRef = firebase.database().ref('eventsUserIsIn').child(userUid).child(eventUid);
              var notificationsRef = firebase.database().ref('notifications').child(userUid).child(eventUid);

              // add user as guest
              eventGuestsRef.set(0).then(function() {
                // add event under user
                eventsUserIsInRef.set(0).then(function() {
                  // add notification
                  notificationsRef.set(0).then(function() {
                    console.log('Invited user ', userUid, ' to event ', eventUid);
                    deferred.resolve();
                  });
                });
              });
            }
          });

          return deferred.promise;
        },

        // responds to an event invite
        // response is true for accept, false for decline
        // NOTE and TODO: magic number 1 means accepted
        respondToEventInvite: function(userUid, eventUid, response) {
          var deferred = $q.defer();

          // firebase refs
          var notificationsRef = firebase.database().ref('notifications').child(userUid).child(eventUid);
          var eventGuestsRef = firebase.database().ref('eventGuests').child(eventUid).child(userUid);
          var eventsUserIsInRef = firebase.database().ref('eventsUserIsIn').child(userUid).child(eventUid);

          // accept
          if(response) {
            // add user as guest
            eventGuestsRef.set(1).then(function() {
              // add event under user
              eventsUserIsInRef.set(1).then(function() {
                // remove notification
                notificationsRef.remove().then(function() {
                  console.log('Accepted invite!');
                  deferred.resolve();
                });
              });
            });
          } else { // decline
            // remove user as guest
            eventGuestsRef.remove().then(function() {
              // remove event under user
              eventsUserIsInRef.remove().then(function() {
                // remove notification
                notificationsRef.remove().then(function() {
                  console.log('Declined invite!');
                  deferred.resolve();
                });
              });
            });
          }

          return deferred.promise;
        }
      };
    }
  ]);
