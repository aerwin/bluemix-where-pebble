/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Requires for our own custom modules
var errorView = require('./error-view');

function getPosition(callback) {
	navigator.geolocation.getCurrentPosition(
		function(pos) {
			callback(null, pos);
		}, function(err) {
			errorView.show("Couldn't get coordinates for current position.", err);
			callback(err, null);
		}
	);
}

// Export a public function
module.exports = {
	getPosition: function(callback) {
		getPosition(callback);
	}
};