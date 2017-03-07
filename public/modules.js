/**
 * File name: modules.js
 * Authors: Elliot Yoon
 * Description: Angular module defines.
 */

angular.module('controllers', ['firebase', 'ngCookies']).config(function($locationProvider) {
  $locationProvider.html5Mode({ // url parsing for auth monitoring
    enabled: true,
    requireBase: false
  });
});
angular.module('models', ['firebase', 'ngCookies']);
angular.module('ziconnect', ['controllers', 'models', 'ngRoute', 'firebase']).config(function() {
  // Initialize Firebase
  // TODO: change for production
  var config = {
    apiKey: "AIzaSyCBUIl1AeLBp9PSM4TW3nAUERLKfVigWz8",
    authDomain: "cse110-teamzico-ziconnect-dev.firebaseapp.com",
    databaseURL: "https://cse110-teamzico-ziconnect-dev.firebaseio.com",
    storageBucket: "cse110-teamzico-ziconnect-dev.appspot.com",
    messagingSenderId: "420682510691"
  };
  firebase.initializeApp(config);
});
