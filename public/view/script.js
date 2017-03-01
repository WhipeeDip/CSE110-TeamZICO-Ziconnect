// This is not working...still trying to figure out why

var angularApp = angular.module('angularApp');

// create the controller and inject Angular's $scope
angularApp.controller('mainController', function($scope) {

  // create a message to display in our view
  $scope.x = 'Everyone come and see how good I look!' + 
    'Everyone come and see how good I look!' + 
    'Everyone come and see how good I look!';
});

