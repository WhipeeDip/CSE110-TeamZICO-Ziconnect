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
    res.redirect('/login');
  });

  // Homepage GET route, Author: EY
  app.get('/home', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve('public/view/home.html'));
  });

  // Login page GET route, Author: EY
  app.get('/login', function(req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve('public/view/login.html'));
  });

  // THIS SHOULD ALWAYS BE THE LAST ROUTE
  // if all other routes fall through, 404 handling
  app.get('*', function(req, res) {
    res.redirect('/home');
  })
};  
