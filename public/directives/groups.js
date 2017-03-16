/**
 * File name: groups.js
 * Authors: Kevan Yang
 * Description: Loads groups for profile
 */

angular.module('controllers')
  .directive('groups', function () {
      return {
        scope: false,
        templateUrl: "/directives/groups.html"
      };
  });
