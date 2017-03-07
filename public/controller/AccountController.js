 /**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['AccountServices', '$scope', '$cookies', '$window', '$location', '$q', '$firebaseAuth', 
    function(AccountServices, $scope, $cookies, $window, $location, $q, $firebaseAuth) {

      // if auth state changes, check login status
      // NOTE: this is triggered everytime it loads 
      $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        console.log('$onAuthStateChanged() triggered!', firebaseUser);
        console.log('Current Path:', $location.path());
        if(firebaseUser) { // someone logged in or is already logged in
          if($location.path() == '/login') {
            var user = AccountServices.buildUserObjectFromFirebase(firebaseUser);
            AccountServices.loginWithUser(user).then(function() { // promise resolved
              //$cookies.putObject('user', user);
              $window.location.href = '/home';
            }, function(reason) { // promise rejected
              console.log('Login failed:', reason);
            });
          }
        } else { // someone logged out or no one is already logged in
          if($location.path() != '/login') {
            //$cookies.remove('user');
            $window.location.href = '/login';  
          }
        }
      });

      // grabs the current user into scope
      $scope.getUserIntoScope = function() { 
        //$scope.user = $cookies.getObject('user');
        $scope.user = AccountServices.getUser();
      };

      // called by login button
      $scope.login = function() {
        // create sign in window, and let AccountServices do the database handling
        $firebaseAuth().$signInWithPopup('google').then(function(googleUser) {
          console.log('Google user attempting login:', googleUser);
          // auth listener will take over
        });
      };

      // called by logout button
      $scope.logout = function() {
        AccountServices.logout().then(function() {
          //$cookies.remove('user');
          console.log('Signout successful!');
        });
      };
    }
]);
