/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var UI = require('ui');

var config = require('./config'); 

// Reference to card we will show and update later
var aboutCard;

function showAbout() {
	// Create the card to show about info
	if (!aboutCard) {
		aboutCard = new UI.Card({
			title: ' Where?',
			icon: 'images/bluemixGlobe_small.png',
			fullscreen: config.fullscreen,
			scrollable: true
		});
	}
	
	var bodyMessage = 'by ' + config.author + '\n' +
		config.aboutBody;
	aboutCard.body(bodyMessage);
	aboutCard.show();
}

// Export a public function
module.exports = {
	show: function() {
		showAbout();
	}
};