/**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['$scope', '$rootScope', '$http', '$window', '$location', '$firebaseAuth', 
    function($scope, $rootScope, $http, $window, $location, $firebaseAuth) {

      $scope.login = function() {
        var self = this;
        var loginResult = null;

        // login with google popup
        $firebaseAuth().$signInWithPopup('google').then(function(googleUser) {
          console.log('Logged in Google user info: ', googleUser);
          var user = {
            credential: googleUser.credential,
            uid: googleUser.user.uid,
            name: googleUser.user.displayName,
            email: googleUser.user.email,
            picture: googleUser.user.photoURL
          }
          // post to auth with server
          $http.post('/auth/login', user).then(function successCallback(response) { // if success, return googleUser
            loginResult = response;
            $window.location.href = '/home';
          }, function errorCallback(response) { // if error, return null
            loginResult = null;
          });
        }).catch(function(error) { // if error, return null
          console.log("Signin failed (in AccountController):", error);
          loginResult = null;
        });  
      };

      $scope.logout = function() {
        $http.post('/auth/logout');
      };

      $scope.checkLogin = function() {
        $http.get('/auth').then(function successCallback(response) {
          if(response.data) { // if logged in, redirect to home
            $window.location.href = '/home';
            console.log('Already logged in:', response.data);
          }
        }, function errorCallback(response) {

        });
      };
    },
]);
