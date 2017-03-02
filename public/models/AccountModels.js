/**
 * File name: AccountModels.js
 * Authors: Elliot Yoon
 * Description: Handles accounts.
 */

angular.module('models')
  .factory('AccountModels', ['$cookies', '$http', '$q', '$firebaseAuth',
    function($cookies, $http, $q, $firebaseAuth) {
      return {
        login: function() {
          var deferred = $q.defer();
          var self = this;

          // login with google popup
          $firebaseAuth().$signInWithPopup('google').then(function(googleUser) {
            console.log('Logged in Google user info: ', googleUser);
            var user = self.buildUserObjectFromGoogle(googleUser);

            // POST to login with server
            $http.post('/auth/login', user).then(function successCallback(response) { 
              if(response.data == 'Success') { // create cookie 
                $cookies.putObject('user', user);
                deferred.resolve();
              } else { // POST didn't match 'Success'
                console.log('Login error in AccountController POST mismatch.');
                deferred.reject();
              }
            }, function errorCallback(response) { // error from POST
              console.log('Login error in AccountController POST callback:', error);
              deferred.reject();
            });
          }).catch(function(error) { // error from firebaseAuth
            console.log('Login failed in AccountController firebaseAuth:', error);
            deferred.reject();
          }); 
          
          return deferred.promise
        },

        logout: function() {
          var deferred = $q.defer();
          var user = $cookies.getObject('user');

          // POST to logout with server
          $http.post('/auth/logout', user).then(function successCallback(response) {
            if(response.data == 'Success') { // if success, redirect
              $firebaseAuth().$signOut();
              $cookies.remove('user');
              console.log("Logout successful!");
              deferred.resolve();
            } else {
              console.log('Logout error in AccountController POST mismatch.');
              deferred.reject();
            }
          }, function errorCallback(error) {
            console.log('Logout error in AccountController POST callback:', error);
            deferred.reject();
          });

          return deferred.promise;
        },

        buildUserObjectFromGoogle: function(googleUser) {
          return {
            uid: googleUser.user.uid,
            name: googleUser.user.displayName,
            email: googleUser.user.email,
            picture: googleUser.user.photoURL,
            accessToken: googleUser.credential.accessToken
          };
        }
      }
    }
  ]);