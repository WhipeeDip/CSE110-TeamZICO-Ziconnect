/**
 * File name: navbar.js
 * Authors: TODO
 * Description: TODO
 */

angular.module('controllers')
  .directive('navbar', function () {
      'use strict';
      return {
        scope: false,
        templateUrl: "../directives/navbar.html"
      };
  });
