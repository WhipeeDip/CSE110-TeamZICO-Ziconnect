/**
 * File name: GroupListController.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Handles groups.
 */

angular.module('controllers')
  .controller('GroupListController', ['GroupServices', 'InviteServices', '$scope', '$rootScope', '$firebaseArray',
    function(GroupServices, InviteServices, $scope, $rootScope, $firebaseArray) {

      // grab proper vars
      var userUid = $rootScope.user.uid;
      var groupObj = $scope.groupData;

      // get firebase array of the user's groups 
      var groupsUserIsInRef = firebase.database().ref().child('groupsUserIsIn/' + userUid);
      var groupListRef = firebase.database().ref().child('groupList');

      // prepare group array
      var groupUidToIndex = [];
      groupsUserIsInRef.on('value', function(groupKeyList) {
        $scope.userGroups = [];
        groupKeyList.forEach(function(groupKeySnapshot) {
          var groupKey = groupKeySnapshot.key;

          groupListRef.child(groupKey).once('value').then(function(groupSnapshot) {
            var groupVal = groupSnapshot.val(); 

            if(groupVal != null) {
              var tmp = {
                uid: groupSnapshot.key,
                groupName: groupVal.groupName
              };
              $scope.userGroups.push(tmp);
              groupUidToIndex[tmp.uid] = $scope.userGroups.length - 1;
              $scope.$apply();
            }
          });

          groupListRef.child(groupKey).on('child_changed', function(childSnapshot, prevChildKey) {
            var groupValChange = childSnapshot.val();
            if(groupValChange != null) {
              // edit array
              var newTmp = { 
                uid: childSnapshot.key,
                groupName: groupVal.groupName
              };
              var groupIndex = groupUidToIndex[newTmp.uid];
              $scope.userGroups[groupIndex] = newTmp;
              $scope.$apply();
            }
          });
        });
      });

      groupListRef.on('child_removed', function(oldChildSnapshot) {
        var oldUid = oldChildSnapshot.key;
        var oldIndex = groupUidToIndex[oldUid];
        $scope.userGroups.splice(oldIndex, 1);
        groupUidToIndex.splice(oldUid, 1);
        $scope.$apply();
      });

      // create new group
      $scope.newGroup = function() {
        GroupServices.createGroup(userUid, $scope.newGroupName).then(function() {
          $scope.newGroupName = '';
        });
      };

      // add member to existing group
      $scope.addMember = function() {
        //
      };

      // remove user from group
      $scope.removeMember = function(memberUid) {
        GroupServices.removeUserFromGroup(groupObj.$id, userUid);
      };
    }
  ]);
