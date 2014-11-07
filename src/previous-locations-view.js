/* Copyright IBM Corp. 2014 All Rights Reserved                      */

var UI = require('ui');

var config = require('./config'); 
var locationView = require('./location-view');

// Placeholder for menu we'll want to access later
var previousLocationsMenu;

function showPreviousLocations(locations) {
	if (!previousLocationsMenu) {
		// Create the menu
		previousLocationsMenu = new UI.Menu({
			fullscreen: config.fullscreen,
			sections: [{
				title: "Where Have I Been?",
				items: []
			}]
		});
		
		// Add a listener for menu selection events
		previousLocationsMenu.on('select', function(e) {
			var item = e.item;
			if (item.locationData) {
				locationView.show(item.locationData);
			}
		});
	}
	
	// Build up menu items by looping over the locations entries
	var menuItems = [];
	if (locations && locations.length) {
		locations.forEach(function(location) {
			// Determine title to show
			var title;
			var city;
			var address = location.address;
			if (address && Object.keys(address).length) {
				title = address.AddressLine1;
				city = address.City;
			}
			
			if (!title) {
				// Fall back to latitude and longitude
				title = location.latitude + ', ' + location.longitude;
			}
			
			// We'll put the time since the location was posted after the
			// city name (if city name existed)
			var dateTime = new Date(location.time);
			var timeDiffStr = getTimeDifference(dateTime, new Date());
			var subtitle = timeDiffStr;
			if (city) {
				subtitle += ' / ' + city;
			}
				
			// Push the new menu entry
			menuItems.push({
				title: title,
				icon: 'images/mapPinDithered28.png',
				subtitle: subtitle,
				locationData: location
			});
		});
	} else {
		// No locations so just put a simple message
		menuItems.push({
			title: "No history."
		});
	}
	
	// Replace existing menu items with new ones
	previousLocationsMenu.items(0, menuItems); 
	
	// Show the menu
	previousLocationsMenu.show();
}

// Utility function to generate a string indicating
// how much time has elapsed since the location was
// posted
function getTimeDifference(startDate, endDate) {
    var retVal;
	
	var diff = endDate.getTime() - startDate.getTime();
	var secs = diff / 1000;
	if (secs < 60) {
		retVal = Math.round(secs) + ' s';
	} else {
		var mins = secs / 60;
		if (mins < 60) {
			retVal = Math.round(mins) + ' m';
		} else {
			var hours = mins / 60;
			if (hours < 24) {
				retVal = Math.round(hours) + ' h';
			} else {
				var days = hours / 24;
				if (days < 365) {
					retVal = Math.round(days) + ' d';
				}
			}
		}
	}
	
	return retVal;
}

// Export a public function
module.exports = {
	show: function(locations) {
		showPreviousLocations(locations);
	}
};