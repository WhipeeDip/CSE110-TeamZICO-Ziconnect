/**
 * File name: sidebar.js
 * Authors: LeDaniel Leung
 * Description: creating a directive for the sidebar
 */

   
angular.module('controllers')
  .directive('sidebar', function(){
  return{
    templateUrl: '../directives/sidebar.html'
  };
});