/* Copyright IBM Corp. 2014 All Rights Reserved                      */

/**************************************************
 * Configuration params.
 **************************************************/

module.exports = {
	//baseUrl: 'http://192.168.1.82:6001', //AWE TODO: Need note in article you can't just use localhost
	baseUrl: 'https://where.mybluemix.net',
	apiRoot: 'api',
	locationsRoot: 'locations',
	
	// Attempt to be able to control part of my app's "theme" from one place
	fullscreen: true,
	backgroundColor: 'black',
	color: 'white',
	
	// Some "constants"
	MAX_WIDTH: 144,
	MAX_HEIGHT: 168,
	
	// Text for About View
	author: "@TonyErwin",
	aboutBody: "This sample app is powered by IBM Bluemix and was coded with Pebble.js in the CloudPebble IDE."
};