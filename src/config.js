/* Copyright IBM Corp. 2014 All Rights Reserved                      */

/**************************************************
 * Configuration params.
 **************************************************/

module.exports = {
	// NOTE: If you change the baseUrl to do local development, you cannot use localhost. You need
	// to use an IP address or host name available on your local network.
	baseUrl: 'https://where.mybluemix.net',
	//baseUrl: 'http://192.168.1.XX:YYYY', 
	
	apiRoot: 'api',
	locationsRoot: 'locations',
	
	searchDistance: 750,
	
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