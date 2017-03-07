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
          self.createGroupList(user.uid);
          self.createUsersEventList(user.uid);
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
          }
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
