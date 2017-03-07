/**
 * File name: groupsUserisIn.js
 * Authors: Kevan Yang
 * Description: Creates user's group lists in database
 */

function createGroupList(uid, firebase) {
  var db = firebase.database();
  var newRef = db.ref('groupLists');
  //store under groupList
  newRef.push(uid);
}

// go back to it later
function createGroup(uid, people) {
  return;
}
// used later after account is created
function addGroup(uid, groupID, firebase) {
  var db = firebase.database();
  var newRef = db.ref('groupLists/' + uid);
  newRef.push(groupID);
}

// to use 1-create grouplist,
//var newEventKey = firebase.database().ref().child('eventList').push().key;
