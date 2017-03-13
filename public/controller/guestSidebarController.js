angular.module('controllers')
  .controller('guestSidebarController', ['$scope', '$firebaseArray',
    function($scope, $firebaseArray){
      $scope.loadGuests=function(eid){
        var userRef = firebase.database().ref('eventGuests').child(eid);
        var list = $firebaseArray(userRef);
        $scope.list = list;
        console.log(list);
          console.log(eid);
      }
    }
  ]);
