/**
 * File name: EventList.js
 * Authors: Kevan Yang
 * Description: Creates user's event lists in database
 */

function createEventList(uid, firebase) {
  var db = firebase.database();
  var newRef = db.ref("eventLists");
  //store under groupList
  newRef.push(uid);
}

// used later after account is created
function addEvent(uid, groupID, firebase) {
  var db = firebase.database();
  var newRef = db.ref("eventLists/" + uid);
  newRef.push(groupID);
}

// to use 1-create grouplist,
//var newEventKey = firebase.database().ref().child('eventList').push().key;
