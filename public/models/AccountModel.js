/**
 * File name: AccountModel.js
 * Authors: Elliot Yoon
 * Description: Model for accounts. Handles authentication and such.
 * Some code used from andela's generator-firebase-angular-node on GitHub under the BSD-2-Clause License.
 */

angular.module('models')
  .factory('AccountModel', ['$firebaseAuth', '$rootScope', 'FBRefs',
    function($firebaseAuth, $rootScope, FBRefs) {
      return {

        // login function
        login: function() {
          var self = this;
          $firebaseAuth().$signInWithPopup('google').then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.uid);
            self.auth(firebaseUser);
          }).catch(function(error) {
            console.log("Signin failed:", error);
          });
        },

        // logout function
        logout: function() {
          $rootScope.currentUser = null
          $firebaseAuth().$signOut().then(function() {
            // signed out
          }, function(error) {
            console.log("Logout failed:", error);
          });
        },

        // does auth and store in firebase; not finished
        auth: function(authData) {
          if(!authData) {
            // logged out
            return null;
          }

          var self = this;

          // properly handle either login or creation
          var userRef = FBRefs.userList.child(authData.user.uid);
          userRef.once('value').then(function(snapshot) {
            var user = snapshot.val();

            if(user) {
              // google user logging in, update their access token
              if(authData.provider === "google") {
                userRef.update({access_token: authData.token});
              }
              // save the current user in the global scope
              $rootScope.currentUser = user;
            } else {
              // construct the user record the way we want it
              user = self.buildUserObjectFromGoogle(authData);
              // save it to firebase collection of users
              userRef.set(user);
              // save the current user in the global scope
              $rootScope.currentUser = user;
            }

            return user;
          });
        },

        // properly build a user object from google auth with info we need because it's HUGE
        buildUserObjectFromGoogle: function(authData) {
          return {
            uid: authData.user.uid,
            name: authData.user.displayName,
            email: authData.user.email,
            access_token: authData.credential.accessToken,
            picture: authData.user.photoURL
          };
        }
      };
    }
  ]);
