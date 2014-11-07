/* Copyright IBM Corp. 2014 All Rights Reserved                      */

// Requires for Pebble.js modules
var UI = require('ui');
var Vibe = require('ui/vibe');

// Requires for our own custom modules
var config = require('./config');
var locationView = require('./location-view');
var previousLocationsView = require('./previous-locations-view');
var workingView = require('./working-view'); 
var aboutView = require('./about-view'); 
var ajaxLocations = require('./ajax-locations'); 
var geolocation = require('./geolocation');

// Create main menu
var main = new UI.Menu({
	fullscreen: config.fullscreen,
	sections: [{
		title: "Where?",
		items: [{
			title: 'Where Am I?',
			icon: 'images/mapPinDithered28.png',
			subtitle: 'Current location'
		}, {
			title: 'Where Was I?',
			icon: 'images/plainGlobe_small.png',
			subtitle: 'Previous locations'
		}, {
			title: 'About',
			icon: 'images/bluemixGlobe_small.png',
			subtitle: 'Info about the app'
		}]
	}]
});

// Show the main menu
main.show();

// Add select handler for main menu
main.on('select', function(e) {
	if (e.sectionIndex === 0) {
		if (e.itemIndex === 0) {
			// Where am I?
			handleCurrentLocation();
		} else if (e.itemIndex === 1) {
			// Where Was I?
			handlePreviousLocations();
		} else {
			// About
			handleAbout();
		}
	}
});

function handleCurrentLocation() {
	// Show indication to user we're retrieving data
	workingView.show(true);
	
	// Get current position, and if that is successful send it to server
	geolocation.getPosition(function(err, results) {
		if (!err) { 
			ajaxLocations.postLocation(results, function(postErr, postResults) {
				if (postResults && !postErr) {
					// We've gotten good results, so hide the working indicator
					workingView.show(false);
					
					// Put the data on the screen
					locationView.show(postResults);
					
					// Send a long vibration
					Vibe.vibrate('long');
				}
			});
		} 
	});
}

function handlePreviousLocations() {
	// Show indication to user we're retrieving data
	workingView.show(true);
	
	ajaxLocations.getLocations(function(err, results) {
		if (!err) { 
			// We've gotten good results, so hide the working indicator
			workingView.show(false); 
					
			// Put the data on the screen
			previousLocationsView.show(results);
					
			// Send a long vibration
			Vibe.vibrate('long');	
		} 
	});
}

function handleAbout() {
	aboutView.show();
}

