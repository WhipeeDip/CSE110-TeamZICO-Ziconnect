/**
 * File name: AccountController.js
 * Authors: Elliot Yoon
 * Description: Controller for accounts.
 */

angular.module('controllers')
  .controller('AccountController', ['$scope', 'AccountModel',
    function($scope, AccountModel) {
      $scope.login = function() {
        AccountModel.login();
      };

      $scope.logout = function() {
        AccountModel.logout();
      };
    },
]);
