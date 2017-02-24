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
require('./public/controller/EventController.js');

// TEST BEGIN
// Custin 1


var database = firebase.database();

var newEventKey = firebase.database().ref().child('eventList').push().key;

function writeEventData(name, eventLocation, date, description,
  potluck) {
  firebase.database().ref('eventList/' + newEventKey).set({
    eventName: name,
    eventLocation: eventLocation,
    eventDate: date,
    eventDescription: description,
    eventPotluck: potluck
  });
}

writeEventData("Custin's Bonanza", "San Diego, CA", "March 19, 2017",
  "A bonanza for Custin's best friends. Feat. Just 2 Boyz.", true);

// TEST END

// listens on port, logs a message
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
