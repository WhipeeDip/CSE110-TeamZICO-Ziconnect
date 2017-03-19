/**
 * File name: hostAction.js
 * Authors: Caris Wei
 * Description: Load host actions only for hosts
 */

angular.module('controllers')
  .directive('hostAction', function () {
      return {
        scope: false,
        templateUrl: "/directives/hostAction.html"
      };
  });
