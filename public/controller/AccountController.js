 /**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['AccountServices', '$scope', '$cookies', '$window', '$location', '$q', '$firebaseAuth',
    function(AccountServices, $scope, $cookies, $window, $location, $q, $firebaseAuth) {

      // nope, still loops >_>
      /*$scope.authChangeCount = 0; // how many times auth change has happened

      // if auth state changes, check login status
      $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        console.log('Login state changed!', firebaseUser);
        $scope.authChangeCount++;
        if($scope.authChangeCount > 0) { // to prevent it from triggering on page load
          if(firebaseUser) { // someone logged in
            $window.location.href = '/home';
          } else { // someone logged out
            $window.location.href = '/login';
          }
        }
      });*/

      $scope.getUser = function() {
        var user = AccountServices.getUser();
        $scope.user = user;
        $scope.name = user.name;
        $scope.pic = user.picture;
      };

      $scope.login = function() {
        // create sign in window, and let AccountServices do the database handling
        $firebaseAuth().$signInWithPopup('google').then(function(googleUser) {
          console.log('Google user attempting login:', googleUser);

          AccountServices.loginWithGoogleUser(googleUser).then(function() { // promise resolved
            var user = AccountServices.buildUserObjectFromGoogle(googleUser);
            $cookies.putObject('user', user);
            $window.location.href = '/home';
          }, function(reason) { // promise rejected
            console.log('Login failed:', reason);
          });
        });
      };

      $scope.logout = function() {
        AccountServices.logout().then(function() {
          $cookies.remove('user');
          console.log('Signout successful!');
          $window.location.href = '/login';
        });
      };

      $scope.loginCheck = function() {
        var user = $cookies.getObject('user');
        if(user) {
          $window.location.href = '/home';
        }
      }
    }
]);
