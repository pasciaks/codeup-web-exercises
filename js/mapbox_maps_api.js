"use strict";

/*

Exercises
Please follow the instructions below. Remember to commit your changes after each step. At the end of the exercise, push your changes to GitHub.

Generate a Mapbox API Key using the steps from above
Create a new file named mapbox_maps_api.html and add a map using the next steps.
Generate a map that shows the city with your favorite restaurant using geocoding.
Redraw the map of the above location at zoom levels 5, 15, and 20. Do this by simply changing the value of zoom level where the map properties are initially set and refresh the page to see the changes. Can the zoom be changed programmatically after the initial map is drawn?
Create a marker on your map of the exact location of your favorite restaurant set the zoom to allow for best viewing distance.
Create a popup with the name of the restaurant.
Make sure the info window does not display until the marker has been clicked on.
Refactor your code to display at least three of your favorite restaurants with information about each. Create an array of objects with information about each restaurant to accomplish this. Use a .forEach() loop rather than a for loop.
Bonuses (roughly in ascending order of challenge)
Info windows can contain basic HTML, not just plain text. Add some additional information about your restaurant to the popup such as why it is your favorite, dishes you like, images, etc.
Add a select input that allows the user to change the zoom level to 5, 15, or 20.
Add a text box for the user to enter an address that will use geocoding to center the map and place a marker on that location.
Add a button that will hide all markers.
Using this marker animation example as a starting point, animate a marker to bounce up and down. Alter the animation to stop after two seconds. Make the amount of bounce animation scale according to zoom level.
Replace the generic marker icon with an image that is more appropriate for each restaurant. A tutorial for this can be found here.

 */

// console.log("mapbox-test.js is connected...");

// mapboxgl.accessToken = MAPBOX_TOKEN;

// const setCurrentPosition = async () => {
//     await navigator.geolocation.getCurrentPosition(function (navPosObj) {
//         console.log("Latitude is :", navPosObj.coords.latitude);
//         console.log("Longitude is :", navPosObj.coords.longitude);
//         console.log("Latitude is :" + navPosObj.coords.latitude + " Longitude is :" + navPosObj.coords.longitude);
//
//         try {
//             localStorage.setItem('slp_nav_lat', navPosObj.coords.latitude);
//             localStorage.setItem('slp_nav_lng', navPosObj.coords.longitude);
//             sessionStorage.setItem('slp_nav_lat', navPosObj.coords.latitude);
//             sessionStorage.setItem('slp_nav_lng', navPosObj.coords.longitude);
//
//             map.flyTo({center: [navPosObj.coords.longitude, navPosObj.coords.latitude]});
//
//         } catch {
//             console.log("Not able to obtain geo coords.");
//         }
//     });
// }

/***
 * geocode is a method to search for coordinates based on a physical address and return
 * @param {string} search is the address to search for the geocoded coordinates
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the latitude and longitude as a two element array
 *
 * EXAMPLE:
 *
 *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */
// function geocode(search, token) {
//     let baseUrl = 'https://api.mapbox.com';
//     let endPoint = '/geocoding/v5/mapbox.places/';
//
//     let uriEncodedSearch = encodeURIComponent(search);
//     let uriDecodedSearch = decodeURIComponent(uriEncodedSearch);
//
//     console.log("uriEncodedSearch: " + uriEncodedSearch);
//     console.log("uriDecodedSearch: " + uriDecodedSearch);
//
//     return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
//         .then(res => res.json())
//         // to get all the data from the request, comment out the following three lines...
//         .then(data => data.features[0].center);
// }

/***
 * reverseGeocode is a method to search for a physical address based on inputted coordinates
 * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
 * @param {string} token is your API token for MapBox
 * @returns {Promise} a promise containing the string of the closest matching location to the coordinates provided
 *
 * EXAMPLE:
 *
 *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
 *      // do something with results
 *  })
 *
 */
// function reverseGeocode(coordinates, token) {
//     var baseUrl = 'https://api.mapbox.com';
//     var endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
//         .then(res => res.json())
//         // to get all the data from the request, comment out the following three lines...
//         .then(data => data.features[0].place_name);
// }

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', // style URL
//     center: [-74.5, 40], // starting position [lng, lat]
//     zoom: 9, // starting zoom
// });

// setCurrentPosition();

// the  geocode method from mapbox-geocoder-utils.js
// geocode("600 Navarro St #350, San Antonio, TX 78205", MAPBOX_TOKEN).then(result => {
//     console.log(result);
//     map.setCenter(result);
//     map.setZoom(15);
// });

// reverse geocode method from mapbox-geocoder-utils.js
// reverseGeocode({lng: -98.4861, lat: 29.4260}, MAPBOX_TOKEN).then(results => {
//         console.log(results);
//         alert(JSON.stringify(results));
//     }
// );

// function placeMarkerAndPopup(info, token, map) {
//     geocode(info.address, token).then(coords => {
//         let popup = new mapboxgl.Popup()
//             .setHTML(info.popupHTML);
//         let marker = new mapboxgl.Marker({
//             draggable: true
//         })
//             .setLngLat(coords)
//             .addTo(map)
//             .setPopup(popup);
//
//         function onDragEnd(e) {
//
//             const lngLat = e.target.getLngLat();
//             console.log(e.target);
//             console.log(lngLat);
//         }
//
//         marker.on('dragend', onDragEnd);
//
//         popup.addTo(map);
//
//     });
// }

// const alamoInfo = {
//     address: "The Alamo, San Antonio",
//     popupHTML: "<p>Welcome to the Alamo!</p>"
// };
//
// placeMarkerAndPopup(alamoInfo, MAPBOX_TOKEN, map);

// setTimeout(function () {
//     map.setZoom(14.34); //set map zoom level for desktop size
// }, 15000);

// setTimeout(function () {
//     map.setZoom(11); //set map zoom level for mobile size
// }, 5000);


///----
// https://jsfiddle.net/jz08vuo4/
///----

