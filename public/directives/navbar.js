angular.module('navigate', [])
    .directive('navbar', function () {
        'use strict';
        return {
            templateUrl: "/public/directives/navbar.html"
        };
    });