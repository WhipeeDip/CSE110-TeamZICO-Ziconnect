/**
 * File name: GroupController.js
 * Authors: Kevan Yang, Elliot Yoon
 * Description: Handles groups.
 */

angular.module('controllers')
  .controller('GroupController', ['$scope', '$rootScope', '$key', '$firebaseArray',
    function($scope, $key, $firebaseArray) {

      $rootScope.$on("callCreateGroupList", function(){
        $scope.createGroupList();
      });

      // create grouplist, meant for when new account is created
      $scope.createGroupList = function() {
        // initialize
        var ref = firebase.database().ref();
        var list = $firebaseArray(ref);
        // creates groupLists for database if not created yet
        if(list.$indexFor('groupLists') == -1) {
          list.$add('groupLists');
        }
        ref = firebase.database().ref('groupLists');
        list = $firebaseArray(ref);
        list.$add($key);
        console.log('Key has been added');
      };

      // add a group to a user's grouplist
      $scope.addGroup = function(groupID) {
        var ref = firebase.database().ref('groupLists/' + $key);
        var list = $firebaseArray(ref);
        list.$add(groupID);
        condole.log("Added group to user's list");
      };
    }
  ]);
