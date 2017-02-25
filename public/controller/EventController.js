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
  },

  // Retrieves event by eventKey, Author: CC
  // Note the use of callback in this function.
  getEventData: function(eventKey, callback) {
    var query = firebase.database().ref("eventList").orderByKey();
    query.once("value")
    .then(function(snapshot) {
      // Search through the database for a matching key
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        if (key == eventKey) {
          var childData = childSnapshot.val();
          console.log('Loading event...');
          console.log(childData);
          return callback(childData);
        }
      });
    });
  }
  
}
