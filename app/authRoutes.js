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

    // request vars
    var user = req.body;

    // if req is empty, end
    if(!user) {
      console.log('Request body empty in /auth/login!');
      res.end();
    }

    // create/update entry in database
    var userRef = firebase.database().ref('userList').child(user.uid);
    //createGroupList(user.uid, firebase);
    userRef.set(user).then(function() {
      res.send('Success');
    }).catch(function(error) {
      console.log('Error setting user entry:', error);
      res.end();
    });
  });

  /**
    * auth logout POST route
    * Author: EY
    * POST to logout.
    */
  app.post('/auth/logout', jsonParser, function(req, res) {

    // request vars
    var user = req.body;

    // clear accessToken
    var userRef = firebase.database().ref('userList').child(user.uid);
    userRef.child('accessToken').remove().then(function() {
      res.send('Success');
    }).catch(function(error) {
      console.log('Error removing accessToken:', error);
      res.end();
    });
  });
};
