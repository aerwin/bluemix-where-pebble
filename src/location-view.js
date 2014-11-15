/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var UI = require('ui');
var Vector2 = require('vector2');

var config = require('./config'); 

// Placeholders for elements we'll want to access later
var mainWindow;
var headerText;
var dateTimeText; 
var geolocationText; 
var addressHeader;
var address1Text;
var cityText; 
var endText; 

// Layout constants
var PAGE_MARGIN = 2;
var ROW_HEIGHT = 22;
var LABEL_ROW_HEIGHT = 20;

function showLocation(locationData) {
	if (!mainWindow) {
		mainWindow = new UI.Window({
			fullscreen: config.fullscreen
		});
		
		// Need a rect to control background color
		var rect = new UI.Rect({
			size: new Vector2(config.MAX_WIDTH, config.MAX_HEIGHT),
			backgroundColor: config.backgroundColor
		});
		mainWindow.add(rect);

		var rowY = 0;
		
		// Main header
		var headerImage = new UI.Image({
			position: new Vector2(0, 5),
			size: new Vector2(16, 16),
			image: "images/mapPinDithered16_inverse.png"
		});
		mainWindow.add(headerImage);
		
		headerText = new UI.Text({
			position: new Vector2(20, rowY),
			size: new Vector2(config.MAX_WIDTH - 20, ROW_HEIGHT),
			font: 'gothic-18-bold',
			textAlign: 'left',
			color: config.color
		});
		mainWindow.add(headerText);

		// Date/Time
		rowY += ROW_HEIGHT;
		var dateTimeLabel = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(45, ROW_HEIGHT),
			font: 'gothic-18-bold',
			textAlign: 'left',
			text: "When:",
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(dateTimeLabel);
		
		dateTimeText = new UI.Text({
			position: new Vector2(45 + PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH - (2 * PAGE_MARGIN), ROW_HEIGHT),
			font: 'gothic-18',
			textAlign: 'left',
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(dateTimeText);
		
		// Geolocation
		rowY += ROW_HEIGHT;
		var geolocationLabel = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH, LABEL_ROW_HEIGHT),
			font: 'gothic-18-bold',
			textAlign: 'left',
			text: "Geolocation:",
			color: config.color
		});
		mainWindow.add(geolocationLabel);
		
		rowY += LABEL_ROW_HEIGHT;
		geolocationText = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH - (2 * PAGE_MARGIN), ROW_HEIGHT),
			font: 'gothic-18',
			textAlign: 'left',
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(geolocationText);
		
		// Address Header
		rowY += ROW_HEIGHT;
		addressHeader = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH, LABEL_ROW_HEIGHT),
			font: 'gothic-18-bold',
			textAlign: 'left',
			text: "Address:",
			color: config.color
		});
		mainWindow.add(addressHeader);
		
		// Address Line 1
		rowY += LABEL_ROW_HEIGHT;
		address1Text = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH - (2 * PAGE_MARGIN), LABEL_ROW_HEIGHT),
			font: 'gothic-18',
			textAlign: 'left',
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(address1Text);
		
		// Address Last Line
		rowY += LABEL_ROW_HEIGHT;
		cityText = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH - (2 * PAGE_MARGIN), LABEL_ROW_HEIGHT),
			font: 'gothic-18',
			textAlign: 'left',
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(cityText);
		
		// Address Last Line
		rowY += LABEL_ROW_HEIGHT;
		endText = new UI.Text({
			position: new Vector2(PAGE_MARGIN, rowY),
			size: new Vector2(config.MAX_WIDTH - (2 * PAGE_MARGIN), LABEL_ROW_HEIGHT),
			font: 'gothic-18',
			textAlign: 'left',
			textOverflow: 'ellipsis',
			color: config.color
		});
		mainWindow.add(endText);
	}	

	// Date/Time
	var dateTime = new Date(locationData.time);
	headerText.text(getFormattedDate(dateTime));
	dateTimeText.text(dateTime.toLocaleTimeString());
	
	// Fill in geolocation
	geolocationText.text(locationData.latitude.toFixed(6) + "," + locationData.longitude.toFixed(6));
	
	// Fill in address info
	var address = locationData.address;
	if (address && Object.keys(address).length) {
		addressHeader.text('Address (' + address.Distance + ' ft):');
		address1Text.text(address.AddressLine1 || '--');
		if (address.Country === "United States of America" ||
			address.Country === "USA") {
			cityText.text(address.City + ', ' + address.StateProvince);
			endText.text(address.PostalCode || '');	
		} else {
			cityText.text(address.City + ' ' + address.PostalCode);
			endText.text(address.Country);
		}		
	} else {
		addressHeader.text('Address:');
		address1Text.text('No address nearby.');
		cityText.text('');
		endText.text('');
	}

	// Show the window
	mainWindow.show();
}

function getFormattedDate(date) {
	// NOTE: This is NOT how you should do this if you want 
	// to support internationalization. But, on the Pebble, it
	// doesn't seem normal options for locale-specific date
	// formatting work. So, I'm writing a bit of a hack to
	// shorten longer (English) month names.
	var str = date.toLocaleDateString();
	var split = str.split(' ');
	var month = split[0];
	split[0] = month.length > 7 ? month.substring(0, 3) + '.' : month;
	return split.join(' ');
}

// Export public functions
module.exports = {
	show: function(locationData) {
		showLocation(locationData);
	}
};