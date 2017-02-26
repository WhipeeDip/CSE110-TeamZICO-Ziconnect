/**
 * File name: modules.js
 * Authors: Elliot Yoon
 * Description: Angular module defines.
 */

angular.module('ziconnect', ['controllers', 'models']);
angular.module('controllers', ['firebase']);
angular.module('models', ['firebase']);