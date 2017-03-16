/**
 * File name: grouplist.js
 * Authors: Kevan Yang
 * Description: Loads grouplist for profile
 */

angular.module('controllers')
  .directive('grouplist', function () {
      return {
        scope: false,
        templateUrl: "/directives/grouplist.html"
      };
  });
