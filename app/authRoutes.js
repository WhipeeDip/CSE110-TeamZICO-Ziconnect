/**
 * File name: authRoutes.js
 * Authors: Elliot Yoon
 * Description: Routing script for login authetication.
 */

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var firebase = require('firebase');
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

module.exports = function(app) {

  /**
    * auth login POST route
    * Author: EY
    * POST a user here to auth and login (look at AccountController.js for format).
    */
  app.post('/auth/login', jsonParser, function(req, res) {

    // response vars
    var user = req.body;
 
    // sign in
    var credential = firebase.auth.GoogleAuthProvider.credential(user.credential.idToken, user.credential.accessToken);
    firebase.auth().signInWithCredential(credential).catch(function(error) {
      console.log("Signin failed (in authRoutes; signInWithCredential()):", error);
      res.end(); // no data sent back
    }).then(function onResolve() { // finished
      // grab uid
      var uid = user.uid;

      // find user ref in firebase
      var userRef = firebase.database().ref('userList').child(uid);
      var userSnapshot = userRef.once('value').then(function(snapshot) {
          var userExists = snapshot.exists();
          if(userExists) { // user exists, login
            // update access token
            userRef.update({access_token: user.credential.accessToken});
          } else { // user doesn't exist, create account
            // build user object for firebase
            var profile = {
              name: user.name,
              email: user.email,
              picture: user.picture,
              access_token: user.credential.accessToken
            }
            userRef.set(profile);
          }
      });

      console.log("Signed in as:", uid);
      res.send(credential);
    }, function onReject(error) { // promise rejected 
      console.log("Signin failed (in authRoutes; onReject()):", error);
      res.end(); // no data sent back 
    });
  });

  /**
    * auth logout POST route
    * Author: EY
    * POST to logout.
    */
  app.post('/auth/logout', function(req, res) {
      firebase.auth().signOut().then(function() {
        console.log("Logged out.");
      }, function(error) {
        console.log("Logout failed:", error);
      });
  });

  /**
    * auth GET route
    * Author: EY
    * GET to receive current auth status. 
    */
  app.get('/auth', function(req, res) {
    var currentUser = firebase.auth().currentUser;

    if(currentUser) { // user is signed in
      var userToken = currentUser.getToken().then(function() {
          var authInfo = {
          uid: currentUser.uid,
          token: userToken
        };
        res.send(authInfo);
      });
    } else { // no one signed in
      res.end(); // send empty response if no one logged in
    }
  });
};  
