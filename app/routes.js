/**
 * File name: routes.js
 * Authors: Elliot Yoon
 * Description: Routing script.
 */

var path = require('path');

module.exports = function(app) {
  // requests for / will be sending home.html
  app.get('/', function(request, response) {
    response.sendFile(path.resolve('public/view/home.html'));
  });
};  
