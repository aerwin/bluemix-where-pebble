/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var UI = require('ui');
var Vibe = require('ui/vibe');

var config = require('./config'); 
var workingView = require('./working-view'); 

// Reference to card we will show and update later
var errorCard;

function handleError(message, err) {
	// Hide the working indicator
	workingView.show(false); 
	
	// Show "friendly" message to user
	if (!errorCard) {
		errorCard = new UI.Card({
			title: ' Where?',
			icon: 'images/bluemixGlobe_small.png',
			fullscreen: config.fullscreen,
			scrollable: true
		});
	}
	errorCard.body('Error:' + message);
	errorCard.show();
	
	// Log the problem
	console.log('ERROR: ' + message + '; err = ' + JSON.stringify(err));
	
	// Send a long vibration
	Vibe.vibrate('long');
}

// Export a public function
module.exports = {
	show: function(message, err) {
		handleError(message, err);
	}
};