/**
 * File name: routes.js
 * Authors: Elliot Yoon, Christian Cheng
 * Description: Routing script for pages.
 */

var express = require('express');
var app = express();
var path = require('path');

module.exports = function(app) {
  // Root GET route, Author: EY
  app.get('/', function(req, res) {
    res.sendFile(path.resolve('public/view/home.html'));
  });

  // Homepage GET route, Author: EY
  app.get('/home', function(req, res) {
    res.sendFile(path.resolve('public/view/home.html'));
  });

  // Login GET route, Author: EY
  app.get('/login', function(req, res) {
    res.sendFile(path.resolve('public/view/login.html'));
  });
};  
