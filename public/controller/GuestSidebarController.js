/**
 * File name: GuestSidebarController.js
 * Authors: Justin Cai, Caris Wei, Elliot Yoon
 * Description: Controller for displaying an event's participants
 *TODO: MAGIC NUMBERS
 */
angular.module('controllers')
  .controller('GuestSidebarController', ['$scope', '$firebaseArray', 'AccountServices',
    function($scope, $firebaseArray, AccountServices) {
     
      $scope.admin = false;
        
      //load the list of guests and their status
      $scope.loadGuests = function(eid) {
        
        //create different list based on status
        var going = [];
        $scope.going = going;
        
        var maybe = [];
        $scope.maybe = maybe;
          
        var cant = [];
        $scope.cant = cant;
        
        var invited = [];
        $scope.invited = invited;
        
        var guests = firebase.database().ref('eventGuests').child(eid);
        
        guests.once('value').then(function(snapshot) {
          snapshot.forEach(function(guestSnapshot) {
            
            var id = guestSnapshot.key;
            var status = guestSnapshot.val();
            
            AccountServices.uidToName(id).then(function(result) {
              var user = result;
              
              if(status == 1 || status == 4) {
                $scope.going.push(user);
              }
              else if(status == 2) {
                $scope.maybe.push(user);
              }
              else if(status == 3) {
                $scope.cant.push(user);
              }
              else if(status == 0) {
                $scope.invited.push(user);
              }
            });
            
          });                         
        });
          
        //iterates through the list of an event's guests
        /*$scope.users.$loaded().then(function(data) {
          angular.forEach(data, function(val, key) {
              
            //iterates throught the user list to get user info
            $scope.list.$loaded().then(function(data) {
              angular.forEach(data, function(value, key) {
                if(value.$id === val.uid && (status == 1 || status == 4)) {
                  $scope.going.push(val);
                }
                else if(value.$id === val.uid && status == 2) {
                  $scope.maybe.push(val);
                }
                else if(value.$id === val.uid && status == 3) {
                  $scope.cant.push(val);
                }
                else if(value.$id === val.uid && status == 0) {
                  $scope.invited.push(val);
                }  
              });
            });
          });
        });*/
      };

      $scope.guestGoing = function(uid, eid){
        console.log(uid + " is going");
        firebase.database().ref('eventGuests').child(eid).child(uid).set(1);  
      };

      $scope.guestMaybe = function(uid, eid){
          console.log(uid + " is maybe")
          firebase.database().ref('eventGuests').child(eid).child(uid).set(2);  
      };

      $scope.guestNotGoing = function(uid, eid){
          console.log(uid + " can't")
          firebase.database().ref('eventGuests').child(eid).child(uid).set(3);  
      };
      
      $scope.checkAdmin = function(uid, eid){
        console.log('Checking admin status of ', uid, ' in event ', eid);
        return firebase.database().ref('eventGuests').child(eid).child(uid).once('value').then(function(snapshot) {
          var guest = snapshot.val();
          if(guest == 4) { // TODO magic number
            // this user is admin of this
            console.log(uid, ' is an admin!');
            $scope.admin = true;
            $scope.$apply();
          }
        });
      };
      
      $scope.deleteEvent = function(eid){
        if (confirm('Are you sure you want to delete this event? (This action is permanant!)')) {
            
          console.log('deleting event '+eid);
            
          //delete from all trees with eventIDs
          firebase.database().ref('eventList').child(eid).remove();
          firebase.database().ref('eventComments').child(eid).remove();
          firebase.database().ref('eventGuests').child(eid).remove();
          firebase.database().ref('potluck').child(eid).remove();
          firebase.database().ref('potluck/suggestions').child(eid).remove();
          firebase.database().ref('rides').child(eid).remove();
          
          //need to navigate thru all usersIds to find eventIds
          var ref=firebase.database().ref('eventsUserIsIn');
          ref.once('value').then(function(snapshot){
            snapshot.forEach(function(childSnapshot){
              var key = childSnapshot.key;
              console.log("child snapshot " +key);
              console.log(eid);
              firebase.database().ref('eventsUserIsIn').child(key).child(eid).remove();
            });  
          });
          
        }
      }
    
    }
  ]);
