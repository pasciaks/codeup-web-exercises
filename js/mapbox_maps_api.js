"use strict";

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-111.9462511, 40.6466734], // starting position [lng, lat]
    zoom: 14, // starting zoom // 5 // 15 // 20 // 25
});

/*

Exercises

Please follow the instructions below. Remember to commit your changes after each step. At the end of the exercise, push your changes to GitHub.

[x] Generate a Mapbox API Key using the steps from above

[x] Create a new file named mapbox_maps_api.html and add a map using the next steps.

--- Bonuses (roughly in ascending order of challenge) ---

Info windows can contain basic HTML, not just plain text. Add some additional information about your restaurant to the popup such as why it is your favorite, dishes you like, images, etc.

Add a select input that allows the user to change the zoom level to 5, 15, or 20.

Add a text box for the user to enter an address that will use geocoding to center the map and place a marker on that location.

Add a button that will hide all markers.

Using this marker animation example as a starting point, animate a marker to bounce up and down. Alter the animation to stop after two seconds. Make the amount of bounce animation scale according to zoom level.

Replace the generic marker icon with an image that is more appropriate for each restaurant. A tutorial for this can be found here.

 */

// [x] Generate a map that shows the city with your favorite restaurant using geocoding.

function geocodeExample() {
    geocode("310 Seabreeze Blvd, Daytona Beach, FL 32118", MAPBOX_TOKEN)
        .then(result => {

            console.log(result);

            map.flyTo({center: result, zoom: 10})

            // Redraw the map of the above location at zoom levels 5, 15, and 20.
            // Do this by simply changing the value of zoom level where the map properties are initially set and refresh the page to see the changes.
            // Can the zoom be changed programmatically after the initial map is drawn? Yes!

            setTimeout(function () {
                map.flyTo({center: result, zoom: 15})
            }, 5000);

            setTimeout(function () {
                map.flyTo({center: result, zoom: 20})
            }, 1000);

        });
}

document.getElementById("btn-geocode").addEventListener("click", function () {
    geocodeExample();
});


// Create a marker on your map of the exact location of your favorite restaurant set the zoom to allow for best viewing distance.

function markerExample() {
    let popup = new mapboxgl.Popup()
        .setHTML(`<h1>Daytona Taproom<h1>`);
    let marker = new mapboxgl.Marker({
        draggable: false,
    })
        .setLngLat([-81.016247, 29.233942])
        .addTo(map);
    map.flyTo({center: [-81.016247, 29.233942], zoom: 10})
}

document.getElementById("btn-marker").addEventListener("click", function () {
    markerExample();
});

// Create a popup with the name of the restaurant.
// Make sure the info window does not display until the marker has been clicked on.

function popupExample() {
    placeMarkerAndPopupUsingAddress("Daytona Beach Taproom", "<h1>Daytona Taproom<h1>", MAPBOX_TOKEN, map, false);
}

document.getElementById("btn-popup").addEventListener("click", function () {
    popupExample();
});


// Refactor your code to display at least three of your favorite restaurants with information about each.
// Create an array of objects with information about each restaurant to accomplish this. Use a .forEach() loop rather than a for loop.

function favoritesExample() {
    alert("favorites...");
}

document.getElementById("btn-favorites").addEventListener("click", function () {
    favoritesExample();
});

