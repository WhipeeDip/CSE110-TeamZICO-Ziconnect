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
  // TODO: change for production
  var config = {
    apiKey: "AIzaSyCBUIl1AeLBp9PSM4TW3nAUERLKfVigWz8",
    authDomain: "cse110-teamzico-ziconnect-dev.firebaseapp.com",
    databaseURL: "https://cse110-teamzico-ziconnect-dev.firebaseio.com",
    storageBucket: "cse110-teamzico-ziconnect-dev.appspot.com",
    messagingSenderId: "420682510691"
  };
  firebase.initializeApp(config);

  // load gapis
  gapi.load('client:auth2', function() {
    // init gapis
    gapi.client.init({
      apiKey: 'AIzaSyBKJQYomK4JXTYf4oXJN4_doQ1gt7JMHmQ',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      clientId: '420682510691-4khdpqg30qdshb3hjma7bcct51n7ecdr.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar'
    });
  });
});
