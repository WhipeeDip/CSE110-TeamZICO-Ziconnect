/**
 * File name: index.js
 * Authors: Elliot Yoon
 * Basic code copied from heroku: 
 * https://github.com/heroku/node-js-getting-started
 * Description: Main script that is first run when website is started.
 */

// requires
var express = require('express');

var app = express();
var firebase = require("firebase");

// init firebase 
// THIS IS THE DEVELOPMENT DATABASE, WE WILL NOT BE USING PRODUCTION UNTIL
// IT IS READY!
// TODO: change for production
var config = {
  apiKey: "AIzaSyCBUIl1AeLBp9PSM4TW3nAUERLKfVigWz8",
  authDomain: "cse110-teamzico-ziconnect-dev.firebaseapp.com",
  databaseURL: "https://cse110-teamzico-ziconnect-dev.firebaseio.com",
  storageBucket: "cse110-teamzico-ziconnect-dev.appspot.com",
  messagingSenderId: "420682510691"
};
firebase.initializeApp(config);

// heroku will set our port with process.env.PORT
app.set('port', (process.env.PORT || "5000"));

// express will look in /public for assets
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes.js')(app);
//require('./public/controller/AccountController.js')(app);

// listens on port, logs a message
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
