/**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['AccountServices', '$rootScope', '$scope', '$cookies', '$window', '$location', '$q', '$firebaseAuth', 
    function(AccountServices, $rootScope, $scope, $cookies, $window, $location, $q, $firebaseAuth) {

      // if auth state changes, check login status
      // NOTE: this is triggered everytime it loads 
      $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        console.log('$onAuthStateChanged() triggered!', firebaseUser);
        console.log('Current Path:', $location.path());
        if(firebaseUser) { // someone logged in or is already logged in
          var user = AccountServices.buildUserObjectFromFirebase(firebaseUser);
          $rootScope.user = user;
          if($location.path() == '/login') {            
            AccountServices.loginWithUser(user).then(function() { // promise resolved
              $cookies.putObject('user', user);
              $window.location.href = '/home';
            }, function(reason) { // promise rejected
              console.log('Login failed:', reason);
              $rootScope.user = null;
            });
          }
        } else { // someone logged out or no one is already logged in
          if($location.path() != '/login') {
            $cookies.remove('user');
            $rootScope.user = null;
            $window.location.href = '/login';  
          }
        }
      });

      // called by login button
      $scope.login = function() {
        $firebaseAuth().$signInWithPopup('google').then(function(result) {
          console.log('Logging into Firebase with: ', result);
          // auth listener will take over
        }).catch(function(error) {
          console.error('Login with Firebase failed:', error);
          alert('Signin error! Please try to signin again.');
        });
      };

      // called by logout button
      $scope.logout = function() {
        AccountServices.logout().then(function() {
          console.log('Signout successful!');
        });
      };
    }
]);
