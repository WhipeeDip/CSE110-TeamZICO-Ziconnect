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
          $firebaseAuth().$signInWithPopup('google').then(function(firebaseUser) {
            console.log("Signed in as:", firebaseUser.user.uid);
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
            // we're logged out. nothing else to do
            return null;
          }

          // are we dealing with a new user? find out by checking for a user record
          var userRef = FBRefs.userList.child(authData.uid);
          userRef.once('value', function(snap) {
            var user = snap.val();

            if(user) {
              // google user logging in, update their access token
              if(authData.provider === "google") {
                userRef.update({access_token: authData.token});
              }
              // save the current user in the global scope
              $rootScope.currentUser = user;
            }
            else {
              // construct the user record the way we want it
              user = this.buildUserObjectFromGoogle(authData);
              // save it to firebase collection of users
              userRef.set(user);
              // save the current user in the global scope
              $rootScope.currentUser = user;
            }

            // ...and we're done
            return user;
          });
        },

        // properly build a user object from google auth
        buildUserObjectFromGoogle: function(authData) {
          return {
            uid: authData.uid,
            name: authData.google.displayName,
            email: authData.google.email,
            access_token: authData.google.accessToken,
            picture: authData.google.cachedUserProfile.picture,
            created_at: Firebase.ServerValue.TIMESTAMP
          };
        }
      };
    }
  ]);
