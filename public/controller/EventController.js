/**
 * File name: EventController.js
 * Authors: Christian Cheng
 * Description: Handles events
 */

var firebase = require("firebase");
var database = firebase.database;

module.exports = {

  // Creates a new event and saves it in the database, Author: CC
  writeEventData: function (name, eventLocation, date, description,
    potluck) {
    var newEventKey = firebase.database().ref().child('eventList').push().key;
    firebase.database().ref('eventList/' + newEventKey).set({
      eventName: name,
      eventLocation: eventLocation,
      eventDate: date,
      eventDescription: description,
      eventPotluck: potluck
    });
  }
  
}
