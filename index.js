/**
 * File name: index.js
 * Authors: Elliot Yoon, Christian Cheng
 * Basic code copied from heroku: 
 * https://github.com/heroku/node-js-getting-started
 * Description: Main script that is first run when website is started.
 */

// requires
var express = require('express');
var expressApp = express();
var firebase = require("firebase");
var cookieParser = require('cookie-parser');

// heroku will set our port 
// if testing locally, it will be on port 5000
expressApp.set('port', (process.env.PORT || "5000"));

// what express will use
expressApp.use(cookieParser());
expressApp.use(express.static(__dirname + '/public')); // assets
expressApp.use('/scripts', express.static(__dirname + '/node_modules/')); // scripts from npm

// init firebase
// THIS IS THE DEVELOPMENT DATABASE
// WE WILL NOT BE USING PRODUCTION UNTIL APP IS READY!
// TODO: change for production
var config = {
  apiKey: "AIzaSyCBUIl1AeLBp9PSM4TW3nAUERLKfVigWz8",
  authDomain: "cse110-teamzico-ziconnect-dev.firebaseapp.com",
  databaseURL: "https://cse110-teamzico-ziconnect-dev.firebaseio.com",
  storageBucket: "cse110-teamzico-ziconnect-dev.appspot.com",
  messagingSenderId: "420682510691"
};
firebase.initializeApp(config);

// Require controllers
var EventController = require('./public/controller/EventController.js');

// routes
require('./app/routes.js')(expressApp);
require('./app/eventRoutes.js')(expressApp);

// This is a test of event entry into database
// TODO remove before production
//EventController.writeEventData("Custin's Bonanza 2", "San Diego, CA", 
//  "March 19, 2017",
//  "A bonanza for Custin's best friends. Feat. Just 2 Boyz.", true);

// listens on port, logs a message
expressApp.listen(expressApp.get('port'), function() {
  console.log('Ziconnect is running on port', expressApp.get('port'));
});
