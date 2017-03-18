/**
 * File name: GroupController.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Handles groups.
 */

angular.module('controllers')
  .controller('GroupController', ['GroupServices','$scope', '$rootScope', '$firebaseArray',
    function(GroupServices, $scope, $rootScope, $firebaseArray) {

      // grab proper vars
      var userUid = $rootScope.user.uid;
      var groupObj = $scope.groupData;

      // get firebase array of the user's groups 
      var groupsUserIsInRef = firebase.database().ref().child('groupsUserIsIn/' + userUid);
      $scope.userGroups = $firebaseArray(groupsUserIsInRef);

      // create new group
      $scope.newGroup = function() {
        GroupServices.createGroup(userUid, groupObj.groupName).then(function() {
          $scope.groupName = '';
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
