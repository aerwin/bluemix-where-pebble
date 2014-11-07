/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var UI = require('ui');
var Vector2 = require('vector2');

var config = require('./config'); 

// Reference window we will show and update later
var workingIndicator;

function showWorkingIndicator(show) {
	if (!workingIndicator) {
		workingIndicator = new UI.Window({
			fullscreen: config.fullscreen
		});
		
		// Put 144x168 image with out logo on screen
		var image = new UI.Image({
			size: new Vector2(config.MAX_WIDTH, config.MAX_HEIGHT),
			image: "images/tile_splashCentered.png"
		});
		workingIndicator.add(image);
		
		// Add a white rect to the middle. We'll put some text 
		// on top of it.
		var rect = new UI.Rect({
			position: new Vector2(35, 62),
			size: new Vector2(75, 30),
			textAlign: 'center',
			backgroundColor: 'white'
		});
		workingIndicator.add(rect);
		
		// Put text on top of rect
		var textfield = new UI.Text({
			position: new Vector2(0, 60),
			size: new Vector2(config.MAX_WIDTH, 30),
			font: 'gothic-24-bold',
			text: 'Working...',
			textAlign: 'center',
			color: 'black'
		});
		workingIndicator.add(textfield);
	}	
	if (show) {
		workingIndicator.show();
	} else {
		workingIndicator.hide();
	}
}

// Export a public function
module.exports = {
	show: function(show) {
		showWorkingIndicator(show);
	}
};