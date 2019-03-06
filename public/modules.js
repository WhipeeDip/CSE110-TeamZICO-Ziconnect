/**
 * File name: modules.js
 * Authors: Elliot Yoon
 * Description: Angular module defines.
 */

angular.module('controllers', ['firebase', 'ngCookies']);
angular.module('models', ['firebase', 'ngCookies']);
angular.module('ziconnect', ['controllers', 'models', 'ngRoute', 'firebase']).config(function($locationProvider) {
  // url parsing for auth monitoring
  $locationProvider.html5Mode({ 
    enabled: true,
    requireBase: false
  });
  $locationProvider.hashPrefix('');

  // Initialize Firebase
  var config = {
    apiKey: "TODO: fill in your own info",
    authDomain: "TODO: fill in your own info",
    databaseURL: "TODO: fill in your own info",
    storageBucket: "TODO: fill in your own info",
    messagingSenderId: "TODO: fill in your own info"
  };
  firebase.initializeApp(config);
});
