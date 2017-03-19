/**
 * File name: InviteController.js
 * Authors: Justin Cai, Caris Wei, Elliot Yoon
 * Description: Controller for adding people to event
 */

angular.module('controllers')
  .controller('InviteController', ['InviteServices', '$scope', '$rootScope', '$firebaseArray',
    function(InviteServices, $scope, $rootScope, $firebaseArray) {
      var user = $rootScope.user;

      // searches user
      $scope.searchUser = function() {
        if($scope.input == '') {
          alert('Nothing was entered!')
        } else {
          InviteServices.searchUser($scope.input, user.uid).then(function(results) {
            $scope.users = results;
          });
        }
      };

      // invites
      $scope.inviteUser = function(userUid, eventUid) {
        InviteServices.inviteUserToEvent(userUid, eventUid).then(function(response) {
          // nothing
        }, function(error) {
          if(error == 'exists') {
            alert('This user has already been invited or exists in your event!');
          }
        });
      };
    }
  ]);
