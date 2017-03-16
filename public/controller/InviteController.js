/**
 * File name: InviteController.js
 * Authors: Justin Cai, Caris Wei
 * Description: Controller for adding people to event
 */

angular.module('controllers')
  .controller('InviteController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
      var userRef = firebase.database().ref("userList");
      console.log(userRef);
      $scope.input = null;

      $scope.inviteFunc = function() {
        var list = $firebaseArray(userRef);
        $scope.list = list;

        var users = [];
        $scope.users = users;

        $scope.list.$loaded().then(function(data) {
          angular.forEach(data, function(value, key) {
            if(value.name.toLowerCase().includes(($scope.input).toLowerCase())) {
              $scope.users.push(value);
            }
          });
        });
      };

      $scope.inviteButton = function(uid, eid, ename) {
        //check if they are already invited
        firebase.database().ref('eventGuests').child(eid).child(uid).set(0);
        //firebase.database().ref('eventsUserIsIn').child(uid).child(eid).set('');
        firebase.database().ref('eventsUserIsIn').child(uid).push({
          'eventID': eid,
          'eventName': ename,
        });
        firebase.database().ref('notifications').child(uid).push({
          'eventID': eid,
          'eventName': ename,
        });
        console.log("add to eventGuests and eventsUserIsIn");
        //firebase.database().ref('notifications').child(uid).child(eid).set(0);
      };
    }
  ]);
