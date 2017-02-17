/**
 * File name: AccountController.js
 * Authors: Christian Cheng
 * Description: Handles account login, signup, logout, etc.
 */

var Login = require('../models/accountLogin.js');

module.exports.controller = function(app) {

  app.get('/login', function(req, res) {
      // any logic goes here
      res.render('../view/login.html')
  });

}
