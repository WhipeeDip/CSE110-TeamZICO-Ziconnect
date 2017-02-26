/**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['$scope', '$window', '$location', 'AccountModel',
    function($scope, $window, $location, AccountModel) {
      $scope.login = function() {
        var result = AccountModel.login();

        // redirect if sucessful
        if(result) {
          $window.location.href('/home');  
        }         
      };

      $scope.logout = function() {
        AccountModel.logout();
      };
    },
]);
