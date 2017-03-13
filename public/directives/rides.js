/**
 * File name: rides.js
 * Authors: Elliot Yoon
 * Description: Loads comments for the event.
 */

angular.module('controllers')
  .directive('rides', function () {
      return {
        scope: false,
        templateUrl: "/directives/rides.html"
      };
  });
