var app = angular.module('home', ["ng-route"])

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/write", {
    templateUrl : 'happy.html'
  });

  $locationProvider.html5Mode(true);
});

app.controller('aboutController', function($scope) {
  $scope.message = 'account creation page';
});
