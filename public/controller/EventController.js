/**
 * File name: EventController.js
 * Authors: Christian Cheng
 * Description: Handles events
 */

// requires
var firebase = require("firebase");



var database = firebase.database;
var newEventKey = firebase.database().ref().child('eventList').push().key;

module.exports = {


  writeEventData: function (name, eventLocation, date, description,
    potluck) {
    firebase.database().ref('eventList/' + newEventKey).set({
      eventName: name,
      eventLocation: eventLocation,
      eventDate: date,
      eventDescription: description,
      eventPotluck: potluck
    });
  }
  
}
