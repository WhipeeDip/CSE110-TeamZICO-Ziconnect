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

  // Retrieves event by eventKey or eventName, Author: CC
  // Note the use of callback in this function.
  getEventData: function(eventKey, eventName, callback) {
    var query = firebase.database().ref("eventList").orderByKey();
    query.once("value")
    .then(function(snapshot) {

      // Search through the database for a matching event
      snapshot.forEach(function(childSnapshot) {

        // Search by eventKey if provided
        if (eventKey) {
          var key = childSnapshot.key;
          if (key == eventKey) {
            var childData = childSnapshot.val();
            console.log('Loading event...');
            console.log(childData);
            return callback(childData);
          }

        // Otherwise, search by eventName
        } else {
          var name = childSnapshot.val().eventName;
          if (name == eventName) {
            var childData = childSnapshot.val();
            console.log('Loading event...');
            console.log(childData);
            return callback(childData);
          }
        }
      });

      return callback(null);
    });
  }
  
}
