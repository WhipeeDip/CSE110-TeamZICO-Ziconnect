/**
 * Created by davidxlin on 3/11/17.
 */
angular.module('controllers')
  .controller('newEventController', ['$scope', '$firebaseArray', '$location',
    function($scope, $firebaseArray, $location) {
        var eventRef = firebase.database().ref('eventList');
        $scope.newEvent = {};
        $scope.createEvent = function() {

          var evTime = new Date($scope.eventTime);
          evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
          console.log(evTime);
          var newEvent = {
              eventName: $scope.eventName,
              eventLocation: $scope.eventLocation,
              eventTime: evTimeString,
              eventDate: $scope.eventDate.toDateString(),
              eventDescription: $scope.eventDescription,
              eventPotluck: true
          };

          console.log(newEvent);

          var key = newEventRef = eventRef.push(newEvent).key;
          console.log('ID: ' + key);
          var guestRef = firebase.database().ref('guestList');
          guestRef.child(key).set('');

          var commentRef = firebase.database().ref('eventMessages');
          commentRef.child(key).set('');

          $location.path('/home');
        }


      $scope.editEvent = function() {
        var thisEventRef = firebase.database().ref('eventList/' +
          $scope.eventData.$id);

        var evTime = new Date($scope.eventData.eventTime);
        evTimeString = evTime.toLocaleTimeString([], {hour: '2-digit', minute:
          '2-digit'});
        console.log(evTime);
        var newEvent = {
            eventName: $scope.eventData.eventName,
            eventLocation: $scope.eventData.eventLocation,
            eventTime: evTimeString,
            eventDate: $scope.eventData.eventDate.toDateString(),
            eventDescription: $scope.eventData.eventDescription,
            eventPotluck: true
        };
        console.log(newEvent);

        //eventRef.push(newEvent);
        thisEventRef.update(newEvent);

        $location.path('/' + $scope.eventData.$id + '/info');
      };

      $scope.comment;

      $scope.addComment = function(uid, comment) {
        var thisEventRef = firebase.database().ref('eventMessages/' +
          $scope.eventData.$id);
        var newComment = {
          writer: uid,
          content: comment,
        }
        thisEventRef.push(newComment);
        console.log('Added comment: ' + comment);

      }


    }
  ]);
