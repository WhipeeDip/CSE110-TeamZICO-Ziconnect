/**
 * File name: navbar.js
 * Authors: LeDaniel Leung
 * Description: Navbar directive.
 */

angular.module('controllers')
  .directive('navbar', function () {
      'use strict';
      return {
        scope: false,
        templateUrl: "../directives/navbar.html"
      };
  });
