 /**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['AccountModels', '$scope', '$cookies', '$http', '$window', '$location', '$q', '$firebaseAuth', 
    function(AccountModels, $scope, $cookies, $http, $window, $location, $q, $firebaseAuth) {

      // seems to loop
      /*// if auth state changes, check login status
      $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        console.log('Login state changed!', firebaseUser);
        if(firebaseUser) { // someone logged in
          $window.location.href = '/home';
        } else { // someone logged out
          $window.location.href = '/login';
        }
      });*/

      $scope.login = function() {
        var result = AccountModels.login().then(function() {
          $window.location.href = '/home';
        });
      };

      $scope.logout = function() {
        var result = AccountModels.logout().then(function() {
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
