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
        // create provider to login with
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/calendar"); // google calendar rw

        // create sign in window, and let AccountServices do the database handling
        $firebaseAuth().$signInWithRedirect(provider).then(function() {
          // never called because of redirect
          // auth state change listener will handle everything 
        }).catch(function(error) {
          console.log("Authentication failed in AccountController login():", error);
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
