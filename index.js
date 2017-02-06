/**
 * File name: index.js
 * Authors: Elliot Yoon
 * Basic code copied from heroku: 
 * https://github.com/heroku/node-js-getting-started
 * Description: Main script that is first run when website is started.
 */

// requires 
var express = require('express');
var app = express();

// heroku will set our port with process.env.PORT
app.set('port', (process.env.PORT || "5000"));

// express will look in /public for assets
app.use(express.static(__dirname + '/public'));

// get views from /views, and set view engine to express js
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// requests for / will be rendering index.html
app.get('/', function(request, response) {
  response.render('index.html');
});

// listens on port, logs a message
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
