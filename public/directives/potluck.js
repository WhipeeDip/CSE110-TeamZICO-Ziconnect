/**
 * File name: potluck.js
 * Authors: Kevan Yang
 * Description: Loads potluck for the event.
 */

angular.module('controllers')
  .directive('potluck', function () {
      return {
        scope: false,
        templateUrl: "/directives/potluck.html"
      };
  });
