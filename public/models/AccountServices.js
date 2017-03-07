/**
 * File name: AccountServices.js
 * Authors: Elliot Yoon
 * Description: Handles accounts.
 */

angular.module('models')
  .factory('AccountServices', ['$cookies', '$http', '$q', '$firebaseAuth',
    function($cookies, $http, $q, $firebaseAuth) {
      return {
        loginWithGoogleUser: function(googleUser) {
          var deferred = $q.defer(); // we want to wait for login to finish
          
          var self = this;
          var user = self.buildUserObjectFromGoogle(googleUser);
          var userRef = firebase.database().ref('userList').child(user.uid);
          userRef.set(user).then(function() { // always set to update data if needed
            userRef.set(user);
            console.log('Google user login in Firebase successful!');
            deferred.resolve(); // resolve promise
          }).catch(function(error) {
            console.log('Error setting user entry:', error);
            deferred.reject(error); // error, reject
          });

          return deferred.promise
        },

        logout: function() {
          var deferred = $q.defer(); // $signOut returns an empty promise

          $firebaseAuth().$signOut().then(function() {
            deferred.resolve();
          });

          return deferred.promise;
        },

        getUser: function() {
          return $cookies.getObject('user');
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
