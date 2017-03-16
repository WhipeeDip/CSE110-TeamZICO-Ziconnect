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
      createGroup: function(creatorUid, groupName) {
        var deferred = $q.defer();

        // first, create the group under groupList
        var groupListsRef = firebase.database().ref().child('groupList');
        var groupRef = groupListsRef.push({
          'groupName': groupName,
          'creator': creatorUid,
        });

        groupRef.then(function() {
          var groupUid = groupRef.key;

          // then, add the creator as a group member
          var groupMembersRef = firebase.database().ref().child(
            'groupMembers/' + groupUid + '/' + creatorUid);
          groupMembersRef.set(true).then(function() {

            // finally, add the group as something the user is in
            var groupsUserIsInRef = firebase.database().ref().child(
              'groupsUserIsIn/' + creatorUid + '/' + groupUid);
            groupsUserIsInRef.set(true).then(function() {
              console.log('New group created:', groupUid);
              deferred.resolve();
            });
          });
        });

        return deferred.promise;
      },

      // adds a user to a group
      addUserToGroup: function(groupUid, userUid) {
        var deferred = $q.defer();

        // first, add the user as a group member
        var groupMembersRef = firebase.database().ref().child(
          'groupMembers/' + groupUid + '/' + userUid);
        groupMembersRef.set(true).then(function() {

          // finally, add the group as something the user is in
          var groupsUserIsInRef = firebase.database().ref().child(
            'groupsUserIsIn/' + userUid + '/' + groupUid);
          groupsUserIsInRef.set(true).then(function() {
            console.log('User ', userUid, ' added to group ', groupUid);
            deferred.resolve();
          });
        });

        return deferred.promise;
      },

      // removes a user from a group
      removeUserFromGroup: function(groupUid, userUid) {
        var deferred = $q.defer();

        // remove the user as a group user
        var groupMembersRef = firebase.database().ref().child(
          'groupMembers/' + groupUid + '/' + userUid);
        groupMembersRef.remove().then(function() {

          // remove the group as something the user is in
          var groupsUserIsInRef = firebase.database().ref().child(
            'groupsUserIsIn/' + userUid + '/' + groupUid);
          groupsUserIsInRef.remove().then(function() {
            console.log('User ', userUid, ' removed from group ', groupUid);
            deferred.resolve();
          });
        });

        return deferred.promise;
      }
     }
    }
  ]);
