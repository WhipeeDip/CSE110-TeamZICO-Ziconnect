/*
Makes account
Author: Kevan Yang
*/
// warning: cheesy way to include accountLogin.js
//NOTE: this is yet to be tested :(
//var fs = require('fs');

//eval(fs.readFileSync('accountLogin.js')+'');

// create account object for userList
function createAccount(uid, name, email, picture) {
  this.type = "account";
  this.uid = uid;
  this.name = name;
  this.email = email;
  this.picture = picture;

}

// stores it into firebase
function storeAccount( newAccount, firebase) {
  if(newAccount.type != "account") {
    return;
  }

  // firebase stuff
  var db = firebase.database();
  var ref = db.ref("userList");
  var usersRef = ref;
  // store under userList
  usersRef.set({
     user : {
      name: newAccount.name,
      email: newAccount.email,
      picture: newAccount.picture
    }
  });

}
