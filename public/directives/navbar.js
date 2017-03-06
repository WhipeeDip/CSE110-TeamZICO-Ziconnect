angular.module('navigate', ['ngRoute'])
    .directive('navbar', function () {
        'use strict';
        return {
            templateUrl: "../directives/navbar.html"
        };
    });