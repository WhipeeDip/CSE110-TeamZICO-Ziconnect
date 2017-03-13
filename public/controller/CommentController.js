/**
 * File name: CommentController.js
 * Authors: Elliot Yoon
 * Description: Controller for comments.
 */

angular.module('controllers')
  .controller('CommentController', ['CommentServices', '$scope', '$firebaseArray',
    function(CommentServices, $scope, $firebaseArray) {
      var commentRef = firebase.database().ref().child('eventComments/' + eventUid);
      var commentList = $firebaseArray(commentRef);

    }
  ]);
