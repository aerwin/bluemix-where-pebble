/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Requires for our own custom modules
var errorView = require('./error-view');

// Options to to be used when retrieving the user's geolocation.
var positionOptions = {
	enableHighAccuracy: true, // Ask for highly accurate data
	timeout: 5000, // 5 seconds
	maximumAge: 0 // Don't use cached location
};

function getPosition(callback) {
	navigator.geolocation.getCurrentPosition(
		function(pos) {
			// Do a little tracing
			var coords = pos.coords;
  			console.log('Current position is: ' + coords.latitude + ', ' + coords.longitude +
						' with accuracy = ' + coords.accuracy + ' meters');

			// Invoke the callback
			callback(null, pos);
		}, function(err) {
			errorView.show("Problem getting position. Please make sure Pebble app is authorized to location services.", err);
			callback(err, null);
		},
		positionOptions
	);
}

// Export a public function
module.exports = {
	getPosition: function(callback) {
		getPosition(callback);
	}
};