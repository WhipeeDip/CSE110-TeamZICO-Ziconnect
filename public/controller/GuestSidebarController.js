/**
 * File name: GuestSidebarController.js
 * Authors: Justin Cai, Caris Wei
 * Description: Controller for displaying an event's participants
 *TODO: MAGIC NUMBERS
 */
angular.module('controllers')
  .controller('GuestSidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray) {
     
      $scope.admin = false;
        
      $scope.loadGuests = function(eid) {
        var userRef = firebase.database().ref('eventGuests').child(eid);
        var list = $firebaseArray(userRef);
        $scope.list = list;

        var userList = firebase.database().ref("userList");
        var users = $firebaseArray(userList);
        $scope.users = users;
        
        var result = [];
        $scope.result = result;
          
        $scope.users.$loaded().then(function(data) {
          angular.forEach(data, function(val, key) {
            $scope.list.$loaded().then(function(data) {
              angular.forEach(data, function(value, key) {
                if(value.$id === val.uid) {
                  $scope.result.push(val);
                }
              });
            });
          });
        });
      };
      $scope.going = function(uid, eid){
        console.log(uid + " is going");
        firebase.database().ref('eventGuests').child(eid).child(uid).set(1);  
        
      };
      $scope.maybe = function(uid, eid){
          console.log(uid + " is maybe")
          firebase.database().ref('eventGuests').child(eid).child(uid).set(2);  
      };
      $scope.notGoing = function(uid, eid){
          console.log(uid + " can't")
          firebase.database().ref('eventGuests').child(eid).child(uid).set(3);  
      };
      $scope.checkAdmin = function(uid, eid){
        console.log('checking admin status')
        return firebase.database().ref('eventGuests').child(eid).child(uid).once('value').then(function(snapshot){
          var guest=snapshot.val();
          console.log(guest)
          console.log(eid)
          console.log(uid)
          if(guest==4){
            //this user is admin of this 
            $scope.admin=true;
            $scope.$apply();
          }
          
        });  
      }
      
      
      
      
      
      
    }
  ]);
