/**
 * File name: EventController.js
 * Authors: Christian Cheng
 * Description: Handles events
 */

function Event() {
}

function writeEventData(eventId, eventName) {
  firebase.database().ref('eventList/' + eventId).set({
    eventName: eventName,
  });
}
