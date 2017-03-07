/**
 * File name: AccountServices.js
 * Authors: Elliot Yoon
 * Description: Handles accounts.
 */

angular.module('models')
  .factory('AccountServices', ['$cookies', '$http', '$q', '$firebaseAuth',
    function($cookies, $http, $q, $firebaseAuth) {
      return {

        // creates firebase login record with a prebuilt user object
        // (see buildUserObjectFromFirebase() and buildUserObjectFromGoogle())
        loginWithUser: function(user) {
          var deferred = $q.defer(); // we want to wait for login to finish

          var self = this;
          var userRef = firebase.database().ref('userList').child(user.uid);
          self.createGroupList(user.uid);
          self.createUsersEventList(user.uid);
          userRef.set(user).then(function() { // always set to update data if needed
            console.log('User login in to Firebase successful!');
            deferred.resolve(); // resolve promise
          }).catch(function(error) {
            console.log('Error setting user entry:', error);
            deferred.reject(error); // error, reject
          });

          return deferred.promise
        },

        // logs out from firebase
        logout: function() {
          var deferred = $q.defer(); // $signOut returns an empty promise

          $firebaseAuth().$signOut().then(function() {
            deferred.resolve();
          });

          return deferred.promise;
        },

        // gets the current logged in user
        getUser: function() {
          var self = this;
          var fbUser = $firebaseAuth.$getAuth();
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

        // stores user's group list upon account creation
        createGroupList: function(uid) {
          // initialize
          var ref = firebase.database().ref('groupLists');
          var created;
          ref.once("value")
            .then(function(snapshot) {
              created = snapshot.hasChild(uid);
            });

          // prevents recreating list, which is bad
          if(created) {
            console.log('Account group list has already been created!')
            return;
          }

          ref.push(uid);
          console.log("User's group list created");
        },

        // stores user's list of events upon account creation
        createUsersEventList: function (uid) {
          // initialize
          var ref = firebase.database().ref('usersEventList');
          var created;
          ref.once("value")
            .then(function(snapshot) {
              created = snapshot.hasChild(uid);
            });

          if(created) {
            console.log('Account event list has already been created!');
            return;
          }

          //store under groupList
          ref.push(uid);
          console.log("User's Event list created")
        }
      }
    }
  ]);
