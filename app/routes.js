/**
 * File name: routes.js
 * Authors: Elliot Yoon, Christian Cheng
 * Description: Routing script.
 */

var express = require('express');
var app = express();

// Require formidable for form parsing
var formidable = require('formidable'),
  http = require('http'),
  util = require('util');

var path = require('path');

// Require Controllers
var EventController = require('../public/controller/EventController.js');

module.exports = function(app) {

  // Homepage GET route, Author: EY
  app.get('/', function(req, res) {
    res.sendFile(path.resolve('public/view/home.html'));
  });

  // Create Event POST route, Author: CC
  // TODO: update potluck field
  app.post('/events/create', function(req, res) {
    res.sendFile(path.resolve('public/view/createEvent.html'));
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      EventController.writeEventData(fields.eventName, fields.eventLocation,
        fields.eventDate, fields.eventDescription, true);
      res.write('Your event has been created successfully:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    console.log("New event added.");
  });

  // Create Event GET route, Author: CC
  app.get('/events/create', function(req, res) {
    res.sendFile(path.resolve('public/view/createEvent.html'));
  });

};  
