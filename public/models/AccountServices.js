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
          self.doesUserExist(user.uid);
          console.log('doesUserExist completed');
          var userRef = firebase.database().ref('userList').child(user.uid);


          //self.createGroupList(user.uid);
          //self.createUsersEventList(user.uid);
          //self.doesUserExist(user.uid);

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
            gapi.auth2.getAuthInstance().signOut().then(function() {
              console.log('Attempting gapi signout...');
              deferred.resolve();
            });
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



        /*
        // stores user's group list upon account creation
        createGroupList: function(uid) {

          //store under groupsUserIsIN
          firebase.database().ref('groupsUserIsIn').child(uid).set('');
          console.log("User's group list created");
        },

        // stores user's list of events upon account creation
        createUsersEventList: function (uid) {

          //store under eventsUserIsIn
          firebase.database().ref('eventsUserIsIn').child(uid).set('');
          console.log("User's Event list created")
        },*/

        //checks if user of uid exists, if they do not, calls createUsersEventList and
        //createGroupList to add them to those lists
        doesUserExist: function (uid){
          console.log("doesUserExist() called");
          var ref = firebase.database().ref('userList');
          var exists;
          //check data at uid, if null, that user doesnt exist
          ref.once('value', function(snapshot) {
            exists = snapshot.hasChild(uid);
          });
            console.log(exists);
            if(!exists){
              //if doesnt exist, add them to other trees
              console.log('user does not exist, adding to groups and events');
              //var self=this;
              //self.createGroupList(uid);
              //self.createUsersEventList(uid);
              firebase.database().ref('eventsUserIsIn').child(uid).set('');
              /*
              .then(function() {
                console.log('Created accounts list of events');
              });*/
              firebase.database().ref('groupsUserIsIn').child(uid).set('');
            }
          console.log('finished doesUserExist()');
        }


      }
    }
  ]);
