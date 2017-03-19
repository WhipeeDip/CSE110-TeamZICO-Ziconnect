/**
 * File name: AccountServices.js
 * Authors: Elliot Yoon, Justin Cai
 * Description: Handles accounts.
 */

angular.module('models')
  .factory('AccountServices', ['$rootScope', '$cookies', '$http', '$q', '$firebaseAuth',
    function($rootScope, $cookies, $http, $q, $firebaseAuth) {
      return {

        // creates firebase login record with a prebuilt user object
        // (see buildUserObjectFromFirebase() and buildUserObjectFromGoogle())
        loginWithUser: function(user) {
          var deferred = $q.defer(); // we want to wait for login to finish
          var self = this;

          var userRef = firebase.database().ref('userList').child(user.uid);
          userRef.set(user).then(function() { // always set to update data if needed
            console.log('User login in to Firebase successful!');
            deferred.resolve(); // resolve promise
          }).catch(function(error) {
            console.log('Error setting user entry during Firebase login:', error);
            deferred.reject(error); // error, reject
          });

          return deferred.promise
        },

        // logs out from firebase
        logout: function() {
          var deferred = $q.defer(); // $signOut returns an empty promise

          $firebaseAuth().$signOut().then(function() {
            console.log('Attempting Firebase signout...');
            deferred.resolve();
          });

          return deferred.promise;
        },

        // gets the current logged in user
        getUser: function() {
          var self = this;
          var fbUser = $firebaseAuth().$getAuth();
          if(fbUser) { // a logged in user exists
            return self.buildUserObjectFromFirebase(fbUser);
          } else { // no one is logged in, undefined
            return fbUser;
          }
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

        // call this when you get a firebase user object
        buildUserObjectFromFirebase: function(firebaseUser) {
          return {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            picture: firebaseUser.photoURL
          };
        },

        // convert uid to user name
        uidToName: function(uid) {
          var deferred = $q.defer();

          var userRef = firebase.database().ref('userList').child(uid);
          userRef.once('value').then(function(snapshot) {
            var name = snapshot.name;
            deferred.resolve(name);
          });

          return deferred.promise;
        }
      }
    }
  ]);
