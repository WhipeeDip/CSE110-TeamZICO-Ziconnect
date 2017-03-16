/**
 * File name: GroupServices.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Manages groups.
 */

angular.module('models')
  .factory('GroupServices', ['$q',
    function($q) {
      return {
        // creates a new group
        createGroup: function(creatorUid) {
          var deferred = $q.defer();

<<<<<<< HEAD
      // creates a new group
      createGroup: function(creatorUid, name) {
        var deferred = $q.defer();

        var groupListsRef = firebase.database().ref().child('groupList');
        var groupRef = groupListsRef.push({
          'creator': creatorUid,
          'name': name,
        });
        groupRef.then(function() {
          var groupUid = groupRef.key;
          var groupsUserIsInRef = firebase.database().ref().child('groupsUserIsIn/' + creatorUid);
          var newGroupUserRef = groupsUserIsInRef.push({
            'groupName': name,
          });
          newGroupUserRef.set(true).then(function() {
            console.log('New group created:', groupRef.key);
            deferred.resolve();
=======
          var groupListsRef = firebase.database().ref().child('groupList');
          var groupRef = groupListsRef.push({'creator': creatorUid});
          groupRef.then(function() {
            var groupUid = groupRef.key;
            var groupsUserIsInRef = firebase.database().ref().child('groupsUserIsIn/' + creatorUid);
            var newGroupUserRef = groupsUserIsInRef.child(groupUid);
            newGroupUserRef.set(true).then(function() {
              console.log('New group created:', groupRef.key);
              deferred.resolve();
            });
>>>>>>> 852efdc2dda8250579d8b6ab17533426105cd45a
          });

          return deferred.promise;
        },

        // adds a user to a group
        addUserToGroup: function(groupUid, userUid) {
          var deferred = $q.defer();

          var groupRef = firebase.database().ref().child('groupList/' + groupUid);
          var newUserRef = groupRef.child(userUid);
          newUserRef.set(true).then(function() {
            var groupsUserIsInRef = firebase.database().ref().child('groupsUserIsIn/' + userUid + '/' + groupUid);
            groupsUserIsInRef.set(true).then(function() {
              console.log('User ', userUid, ' added to group ', groupUid);
              deferred.resolve();
            });
          });

<<<<<<< HEAD
        return deferred.promise;
      }

     }
=======
          return deferred.promise;
        }
     } 
>>>>>>> 852efdc2dda8250579d8b6ab17533426105cd45a
    }
  ]);
