/**
 * File name: accountLogin.js
 * Authors: Elliot Yoon
 * Description: Account script. Uses Google Accounts.
 */

var loginApp = angular.module('loginApp', []);

loginApp.controller('LoginController', function ($scope) {

  $scope.loggedIn = false;

  $scope.onSignIn = function(googleUser) {
    console.log('Google Auth Response', googleUser);

    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    $scope.loggedIn = true;
    $scope.$apply();
  }

  $scope.signOut = function() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    $scope.loggedIn = false;
    $scope.$apply();
  }

  window.onSignIn = $scope.onSignIn;
});
