/**
 * File name: GroupServices.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Manages groups.
 */

angular.module('modules')
  .factory('GroupServices', ['$q',
    function($q) {
     return {

      // creates a new group
      createGroup: function(creatorUid) {
        var deferred = $q.defer();

        var groupListsRef = firebase.database().ref().child('groupList');
        var pushPromise = groupListsRef.push({'creator': creatorUid});
        pushPromise.then(function() {
          console.log('New group created:', pushPromise.key);
          deferred.resolve();
        })

        return deferred.promise;
      },

      // adds a user to a group
      addUserToGroup: function(groupUid, userUid) {
        var deferred = $q.defer();

        var groupRef = firebase.database().ref().child('groupList/' + groupUid);
        var newUserRef = groupRef.child(userUid);
        newUserRef.set(true).then(function() {
          console.log('User ', userUid, ' added to group ', groupUid);
          deferred.resolve();
        });

        return deferred.promise;
      }
     } 
    }
  ]);
