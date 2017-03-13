/**
 * File name: comments.js
 * Authors: Elliot Yoon
 * Description: Loads comments for the event.
 */

angular.module('controllers')
  .directive('comments', function () {
      return {
        scope: false,
        templateUrl: "/directives/comments.html"
      };
  });
