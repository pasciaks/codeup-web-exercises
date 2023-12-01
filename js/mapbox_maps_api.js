"use strict";

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-111.9462511, 40.6466734], // starting position [lng, lat]
    zoom: 12, // starting zoom // 5 // 15 // 20 // 25
});

map.addControl(new mapboxgl.NavigationControl());

// ref: https://jsfiddle.net/3tfsu51d/3/

let geojson = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "message": "Wizard",
                "iconSize": [35, 35]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -111.9412411,
                    40.6566634
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Drink",
                "iconSize": [35, 35]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -111.9312411,
                    40.6426634
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Duck",
                "iconSize": [35, 35]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -111.9462411,
                    40.6466634
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "message": "Food",
                "iconSize": [35, 35]
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -111.9262411,
                    40.6466634
                ]
            }
        }
    ]
};

let markers = [];

geojson.features.forEach(function (marker, index) {

    var el = document.createElement('div');
    el.className = 'marker';

    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';

    let random = index % 4;

    switch (random) {
        case 0:
            el.style.backgroundImage = 'url("images/bar.png")';
            break;
        case 1:
            el.style.backgroundImage = 'url("images/drink.png")';
            break;
        case 2:
            el.style.backgroundImage = 'url("images/duck.png")';
            break;
        case 3:
            el.style.backgroundImage = 'url("images/food.png")';
            break;
    }

    // el.style.backgroundImage = 'url("images/bar.png")';    
    // el.style.backgroundImage = 'url("images/drink.png")';    
    // el.style.backgroundImage = 'url("images/duck.png")';

    el.style.width = marker.properties.iconSize[0] + 'px';
    el.style.height = marker.properties.iconSize[1] + 'px';

    el.addEventListener('click', function () {
        console.log(marker.properties.message);
    });

    // add marker to map
    var m = new mapboxgl.Marker(el, {offset: [-marker.properties.iconSize[0] / 2, -marker.properties.iconSize[1] / 2]});
    m.setLngLat(marker.geometry.coordinates);
    m.addTo(map);

    const mPopup = new mapboxgl.Popup()
        .setHTML(`<div style="width:200px;" class='text-center mt-3 border p-0'><p>${marker.properties.message}</p></div>`);

    m.setPopup(mPopup);

    markers.push(m);
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
    geocode("Main Street, Daytona Beach, FL 32118", MAPBOX_TOKEN)
        .then(result => {

            map.flyTo({center: result, zoom: 5})

            // Redraw the map of the above location at zoom levels 5, 15, and 20.
            // Do this by simply changing the value of zoom level where the map properties are initially set and refresh the page to see the changes.
            // Can the zoom be changed programmatically after the initial map is drawn? Yes!

            setTimeout(function () {
                map.flyTo({center: result, zoom: 8})
            }, 5000);

        });
}

document.getElementById("btn-geocode").addEventListener("click", function () {
    geocodeExample();
});


// Create a marker on your map of the exact location of your favorite restaurant set the zoom to allow for best viewing distance.

function markerExample() {

    geocode("1200 Main St Bridge, Daytona Beach, FL 32118", MAPBOX_TOKEN)
        .then(result => {
            let marker = new mapboxgl.Marker({
                draggable: false,
            })
                .setLngLat(result)
                .addTo(map);

            map.flyTo({center: result, zoom: 15})
        });

}

document.getElementById("btn-marker").addEventListener("click", function () {
    markerExample();
});

// Create a popup with the name of the restaurant.
// Make sure the info window does not display until the marker has been clicked on.

function popupExample() {

    let tapRoomLocationMarker = new mapboxgl.Marker({
        draggable: false,
    })
        .setLngLat([-81.016247, 29.233942])
        .addTo(map);

    const taproomPopup = new mapboxgl.Popup()
        .setHTML("<img class='img-fluid' src='images/taproom.png' alt='Daytona Beach Taproom'><p>Daytona Beach Taproom</p><a href='https://www.facebook.com/people/Daytona-Taproom/100044190082852/' target='_blank'>Daytona Beach Taproom</a>");

    tapRoomLocationMarker.setPopup(taproomPopup);

    map.flyTo({center: [-81.016247, 29.233942], zoom: 18})

}

document.getElementById("btn-popup").addEventListener("click", function () {
    popupExample();
});

// Refactor your code to display at least three of your favorite restaurants with information about each.
// Create an array of objects with information about each restaurant to accomplish this. Use a .forEach() loop rather than a for loop.

function favoritesExample() {

    let favorites = [
        {
            "name": "The Cellar",
            "address": "220 Magnolia Ave, Daytona Beach, FL 32114",
            "htmlInfo": "<p>The Cellar!!</p>"
        },
        {
            "name": "The Half Wall",
            "address": "105 W Indiana Ave, DeLand, FL 32720",
            "htmlInfo": "<p>The Half Wall!!</p>"
        },
        {
            "name": "Ocean Deck",
            "address": "127 S Ocean Ave, Daytona Beach, FL 32118",
            "htmlInfo": "<p>Ocean Deck!!</p>"
        },
        {
            "name": "Tiki Hut Pub & Grill",
            "address": "1010 Main St, Daytona Beach, FL 32118",
            "htmlInfo": "<p>Tiki Hut Pub & Grill!!</p>"
        }];

    favorites.forEach(function (favorite, index) {
        geocode(favorite.address, MAPBOX_TOKEN)
            .then(result => {
                let marker = new mapboxgl.Marker({
                    draggable: false,
                })
                    .setLngLat(result)
                    .addTo(map);

                const popup = new mapboxgl.Popup()
                    .setHTML(favorite.htmlInfo);

                marker.setPopup(popup);
            });
    });

    setTimeout(function () {
        map.flyTo({center: [-81.016247, 29.233942], zoom: 11});
    }, 100);

}

document.getElementById("btn-favorites").addEventListener("click", function () {
    favoritesExample();
});

function goHome() {
    document.getElementById("message").innerHTML = "Standby...";
    setTimeout(function () {
        document.getElementById("message").innerHTML = "On the way...";
        setCurrentPosition();
    }, 500);
}

function toggleAll() {
    markers.forEach(function (marker) {
        marker.remove();
    });
    markers = [];
}

document.getElementById("btn-home").addEventListener("click", function () {
    goHome();
    animation();
});

document.getElementById("btn-toggle-all").addEventListener("click", function () {
    toggleAll();
});

// Add a new Marker.
const marker = new mapboxgl.Marker({
    color: '#F84C4C' // color it red
});

const mPopup = new mapboxgl.Popup()
    .setHTML(`<div style="width:200px;" class='text-center mt-3 border p-0'><p>Bounce!!</p></div>`);

marker.setPopup(mPopup);

let bounceSpeed = map.getZoom() / 2;

let counter = 0;
let dirY = .0005 / bounceSpeed;
let stopLimit = 20;
let currentLimit = 0;
let isRunning = false;
let intervalTimer = null;

function animateMarker(timestamp) {

    if (!isRunning) {
        if (intervalTimer) {
            cancelAnimationFrame(intervalTimer);
            ;
        }
        return;
    }

    let data = marker.getLngLat();

    if (!data) {
        return;
    }

    counter++;

    currentLimit++;

    if (currentLimit > stopLimit) {
        isRunning = false;
    }

    if (counter > 0) {
        dirY = .0005 / bounceSpeed;
    }

    if (counter > 10) {
        dirY = -.0005 / bounceSpeed;
    }

    if (counter > 30) {
        counter = 0;
        isRunning = false;
    }

    /* 
    Update the data to a new position 
    based on the animation timestamp. 
    The divisor in the expression `timestamp / 1000` 
    controls the animation speed.
    */

    marker.setLngLat([
        data.lng,
        data.lat += dirY
    ]);


    /* 
    Ensure the marker is added to the map. 
    This is safe to call if it's already added.
    */
    marker.addTo(map);

    // Request the next frame of the animation.
    intervalTimer = requestAnimationFrame(animateMarker);
}

document.getElementById("btn-toggle-bounce").addEventListener("click", function () {
    isRunning = !isRunning;
    marker.setLngLat([-111.9462511, 40.6446734]);
    counter = 0;
    bounceSpeed = map.getZoom() / 2;
    dirY = .0005 / bounceSpeed;
    currentLimit = 0;
    intervalTimer = requestAnimationFrame(animateMarker);
});

