/**
 * File name: FBRefs.js
 * Authors: Elliot Yoon
 * Description: References in Firebase.
 */

angular.module('models')
  .factory('FBRefs', ['$firebaseObject',
    function($cookies, $firebase) {
      var rootRef = firebase.database().ref();  
      
      // define every standard ref used application wide
      return {
        root: rootRef,
        userList: rootRef.child('userList'),
      };
    }
  ]);
