/**
 * File name: CalendarServices.js
 * Authors: Elliot Yoon
 * Description: Handles calendars.
 */

angular.module('models')
  .factory('CalendarServices', ['$q', '$rootScope',
    function($q, $rootScope) {
      return {

        // gets all of the calendars for the current user
        getAllCalendars: function() {
          var deferred = $q.defer();

          gapi.client.calendar.calendarList.list({
            'maxResults': 250,
          }).then(function(response) { // successful response
            console.log('List of calendars:', response);
            deferred.resolve(response);
          }).then(function(reason) { // error 
            console.log('Error in getAllCalendars():', reason);
            deferred.reject(reason);
          });

          return deferred.promise;
        },

        // gets the specified calendar 
        getCalendar: function(calendarId) {
          var deferred = $q.defer();

          gapi.client.calendar.calendarList.get({
            'calendarId': calendarId,
          }).then(function(response) { // successful response
            console.log('Calendar:', response);
            deferred.resolve(response);
          }).then(function(reason) { // error 
            console.log('Error in getCalendar():', reason);
            deferred.reject(reason);
          });

          return deferred.promise;
        },

        // finds and stores busy times for the event
        getBusyTimes: function(eventUid) {
          var deferred = $q.defer();

          // grab all of the user's calendars
          self.getAllCalendars().then(function(listOfCalendars) {
            var calendarItems = listOfCalendars.items;

            // grab event times
            var eventRef = firebase.database().ref('eventLst').child(eventUid);
            eventRef.once('value').then(function(snapshot) {
              var timeBegin = snapshot.timeBegin;
              var timeEnd = snapshot.timeEnd;

              // grab time zone 
              gapi.client.settings.setting({
                'setting': 'timezone'
              }).then(function(response) { // success
                var timeZone = response.value;

                // use freebusy to query times
                // promises all the way down! :)
                gapi.client.calendar.freebusy.query({
                  'timeMin': timeBegin,
                  'timeMax': timeEnd,
                  'timeZone': timeZone,
                  'items': calendarItems
                }).then(function(response) { // sucessful response
                  console.log('freeBusy response:', response);

                  // array of "start" "end" times
                  var busyTimes = response.calendars.busy;

                  // set the busy times
                  var guestListRef = firebase.database().ref('guestList').child(eventUid);
                  var guestRef = guestListRef.child($rootScope.user.uid);
                  guestRef.set('busyTimes').then(function() {
                    deferred.resolve(response);
                  }).catch(function(error) {
                    console.log('Firebase set error in getUserBusyTimes():', error);
                    deferred.reject(error);
                  });
                }).then(function(reason) { // error 
                  console.log('Error in freebusy query:', reason);
                  deferred.reject(reason);
                });
              }).then(function(reason) { // error
                console.log('Error in getting user time zone:', reason);
                deferred.reject(reason);
              })
            });
          });          

          return deferred.promise;
        },

        // finds the best free time for the event by checking all users
        findBestTimeForEvent: function(eventUid) {
          var deferred = $q.defer();

          // TODO: 
          // algorithm to find best time based on user busy times

          var eventRef = firebase.database().ref('eventLst').child(eventUid);
          eventRef.once('value').then(function(snapshot) {

          });

          return deferred.promise;
        }
      }
    }
  ]);
