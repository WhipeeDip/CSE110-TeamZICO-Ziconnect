/**
 * File name: profilegroups.js
 * Authors: Kevan Yang
 * Description: Loads groups for profile.
 */

angular.module('controllers')
  .directive('profilegroups', function () {
      return {
        scope: false,
        templateUrl: "/directives/profilegroups.html"
      };
  });
