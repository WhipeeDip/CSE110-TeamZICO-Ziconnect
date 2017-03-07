/**
 * File name: AccountServices.js
 * Authors: Elliot Yoon
 * Description: Handles accounts.
 */

angular.module('models')
  .factory('AccountServices', ['$cookies', '$http', '$q', '$firebaseAuth',
    function($cookies, $http, $q, $firebaseAuth) {
      return {
        loginWithUser: function(user) {
          var deferred = $q.defer(); // we want to wait for login to finish
          
          var self = this;
          var userRef = firebase.database().ref('userList').child(user.uid);
          userRef.set(user).then(function() { // always set to update data if needed
            console.log('User login in to Firebase successful!');
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

        // call this when you get a google user object from google
        buildUserObjectFromGoogle: function(googleUser) {
          return {
            uid: googleUser.user.uid,
            name: googleUser.user.displayName,
            email: googleUser.user.email,
            picture: googleUser.user.photoURL
          };
        },

        // call this when you get a firebase user object such as in $onAuthStateChanged()
        buildUserObjectFromFirebase: function(firebaseUser) {
          return {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            picture: firebaseUser.photoURL
          };
        }
      }
    }
  ]);
