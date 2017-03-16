/**
 * File name: GroupController.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Handles groups.
 */

angular.module('controllers')
  .controller('GroupController', ['GroupServices','$scope', '$rootScope', '$firebaseArray',
    function(GroupServices, $scope, $rootScope, $firebaseArray) {

      $scope.form = false;
      $scope.text = 'ultimate';
      $scope.currGroup;
      $scope.members = [];

      var groupsinref = firebase.database().ref().child('/groupsUserIsIn/' + $rootScope.user.uid);
      $scope.userGroups = $firebaseArray(groupsinref);

      $scope.groups = ['initial'];

      // create grouplist, meant for when new account is created
      $scope.newGroup = function(name) {
        GroupServices.createGroup($rootScope.user.uid, name);
      };

      $scope.displayForm = function() {
        $scope.form = false;
        console.log($scope.form);
      };

      $scope.toGroupPage = function(gid) {
        // to group page
        console.log('going to group page ' + gid);
      };

    }
  ]);
