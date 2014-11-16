/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Requires for Pebble.js modules
var ajax = require('ajax');

// Requires for our own custom modules
var config = require('./config');
var errorView = require('./error-view');

// Invoke the POST /locations API on the server
function postLocation(position, callback) {
	var url = getLocationsUrl();
	var ajaxArgs = {
		url: url,
		type: 'json', 
		method: 'post',
		data: {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			altitude: position.coords.altitude,
			accuracy: position.coords.accuracy,
			altitudeAccuracy: position.coords.altitudeAccuracy,
			heading: position.coords.heading,
			speed: position.coords.speed,
			
			searchDistance: config.searchDistance,
			deviceId: getDeviceId()
		}
	};
	console.log('postLocation: About to post location to url = ' + url);
	ajax(
		ajaxArgs, 
		function(response) {
			console.log('postLocation: Received response = ' + JSON.stringify(response));
			if (response && response.address) {
				callback(null, response);
			} else {
				var err = {
					data: response
				};
				errorView.show('Received a non-error response with unexpected data.', err);
				callback(err, null);
			}
		},
		function(err) {
			var msg;
			if (err) {
				if (err.message) {
					msg = err.message;
				} else {
					msg = 'An unknown error occurred.';
				}
			} else {
				// This seems to happen when there is a timeout
				msg = 'Timeout occurred. Please try again.';
			}
			errorView.show(msg, err);
			callback(err, null);
		}
	);
}

// Invoke the GET /locations API on the server
function getLocations(callback) {
	var url = getLocationsUrl();
	var ajaxArgs = {
		url: url + '?limit=10&deviceId=' + getDeviceId(),
		type: 'json', 
		method: 'get'
	};
	console.log('getLocation: About to get locations from url = ' + url);
	ajax(
		ajaxArgs, 
		function(response) {
			console.log('getLocation: Received response length = ' + (response && response.length));
			callback(null, response);
		},
		function(err) {
			if (!err) {
				err = {message: "Unknown error."};
			}
			errorView.show("Error occurred while retrieving previous locations.", err);
			callback(err, null);
		}
	);
}

// Construct the URL for the locations api on our server 
// based on config settings
function getLocationsUrl() {
	return config.baseUrl + '/' + config.apiRoot + '/' + config.locationsRoot;
}

function getDeviceId() {
	var deviceId = Pebble.getAccountToken() + ':' + Pebble.getWatchToken();
	return deviceId;
}

// Export public functions
module.exports = {
	postLocation: function(position, callback) {
		postLocation(position, callback);
	},
	
	getLocations: function(callback) {
		getLocations(callback);
	}
};