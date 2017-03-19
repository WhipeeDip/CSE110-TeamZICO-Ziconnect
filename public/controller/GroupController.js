/**
 * File name: GroupController.js
 * Authors: Elliot Yoon
 * Description: Handles groups in group info view.
 */

angular.module('controllers')
  .controller('GroupController', ['GroupServices', 'InviteServices', '$scope', '$rootScope', '$firebaseArray',
    function(GroupServices, InviteServices, $scope, $rootScope, $firebaseArray) {


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
