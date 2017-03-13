/**
 * File name: eventRoutes.js
 * Authors: Elliot Yoon, Christian Cheng
 * Description: Routing script for events.
 */

var express = require('express');
var app = express();
var path = require('path');

// Require formidable for form parsing
var formidable = require('formidable'),
  http = require('http'),
  util = require('util');

// Require Controllers
var EventController = require('../public/controller/EventController.js');

module.exports = function(app) {
  // Create Event POST route, Author: CC
  // TODO: update potluck field
  // app.post('/events/create', function(req, res) {
  //   res.sendFile(path.resolve('public/view/createEvent.html'));
  //   var form = new formidable.IncomingForm();
  //   form.parse(req, function(err, fields, files) {
  //     EventController.writeEventData(fields.eventName, fields.eventLocation,
  //       fields.eventTime, fields.eventDate, fields.eventDescription, true);
  //     res.write('Your event has been created successfully:\n\n');
  //     res.end(util.inspect({fields: fields, files: files}));
  //   });
  //
  //   console.log("New event added.");
  // });

  app.post('/events/edit', function(req, res) {
    res.sendFile(path.resolve('public/view/createEvent.html'));
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      EventController.updateEventData(fields.eventKey, fields.eventName,
        fields.eventLocation, fields.eventTime, fields.eventDate,
        fields.eventDescription, true);
      res.write('Your event has been edited successfully:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });

    console.log("Event updated.");
  });

  // Create Event GET route, Author: CC
  app.get('/events/create', function(req, res) {
    res.sendFile(path.resolve('public/view/createEvent.html'));
  });

  // View Event POST route, Author: CC
  app.post('/events/read', function(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

      var eventData = EventController.getEventData(fields.eventKey,
        fields.eventName, function(eventData) {
        if (!eventData) res.end("Sorry, your event couldn't be found. " +
          "Please check your spelling and try again.");
        res.end(util.inspect({fields: eventData, files: files}));
      });
    });
  });

  // View Event GET route, Author: CC
  app.get('/events/read', function(req, res) {
    res.sendFile(path.resolve('public/view/readEvent.html'));
  });
}
