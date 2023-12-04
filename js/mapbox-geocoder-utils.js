"use strict";

let dynamicallyAddedMapObjectsArray = [];

/**
 * setCurrentPosition is a method to set the current position of the map to the user's current location
 *
 * @returns {Promise<void>}
 */
const setCurrentPosition = async () => {
    await
        navigator.geolocation.getCurrentPosition(function (navPosObj) {
            try {
                localStorage.setItem('slp_nav_lat', navPosObj.coords.latitude);
                localStorage.setItem('slp_nav_lng', navPosObj.coords.longitude);
                sessionStorage.setItem('slp_nav_lat', navPosObj.coords.latitude);
                sessionStorage.setItem('slp_nav_lng', navPosObj.coords.longitude);
                console.log("Latitude is :", navPosObj.coords.latitude);
                console.log("Longitude is :", navPosObj.coords.longitude);

                let resultObject = {
                    "lng": navPosObj.coords.longitude,
                    "lat": navPosObj.coords.latitude
                }

                map.flyTo({center: [resultObject.lng, resultObject.lat], zoom: 15});

                setTimeout(async function () {

                    document.getElementById("message").innerHTML = "You've Arrived!";

                    placeMarkerAndPopupUsingCoords(
                        resultObject,
                        `<p>You've Arrived!</p><br>
                         <pre>${JSON.stringify({"your-location": [navPosObj.coords.longitude, navPosObj.coords.latitude]}, null, 2)}</pre>`,
                        MAPBOX_TOKEN,
                        map,
                        true);

                    let result = await reverseGeocode(resultObject, MAPBOX_TOKEN);

                    document.getElementById("message").innerHTML = JSON.stringify(result, null, 2);
                    return resultObject;

                }, 1500);


            } catch {
                console.log("Not able to obtain geo coords.");
                return null;
            }
        });
}

/***
 * geocode is a method to search for coordinates based on a physical address and return
 *
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
function geocode(search, token) {
    let baseUrl = 'https://api.mapbox.com';
    let endPoint = '/geocoding/v5/mapbox.places/';

    // The following lines are important utility considerations when building strings with parameters
    // This is deliberate documentation.

    // let uriEncodedSearch = encodeURIComponent(search);
    // let uriDecodedSearch = decodeURIComponent(uriEncodedSearch);

    // console.log("uriEncodedSearch: " + uriEncodedSearch);
    // console.log("uriDecodedSearch: " + uriDecodedSearch);

    return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
        .then(res => res.json())
        // to get all the data from the request, comment out the following three lines...
        .then(data => data.features[0].center);
}

/***
 * reverseGeocode is a method to search for a physical address based on inputted coordinates
 *
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
function reverseGeocode(coordinates, token) {
    let baseUrl = 'https://api.mapbox.com';
    let endPoint = '/geocoding/v5/mapbox.places/';
    return fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
        .then(res => res.json())
        // to get all the data from the request, comment out the following three lines...
        .then(data => data.features[0].place_name);
}

// the geocode method from mapbox-geocoder-utils.js
// geocode("600 Navarro St #350, San Antonio, TX 78205", MAPBOX_TOKEN).then(result => {
//     console.log(result);
//     map.setCenter(result);
//     map.setZoom(15);
// });

// the reverse geocode method from mapbox-geocoder-utils.js
// reverseGeocode({lng: -98.4861, lat: 29.4260}, MAPBOX_TOKEN).then(results => {
//         console.log(results);
//         alert(JSON.stringify(results));
//     }
// );

function placeMarkerAndPopupUsingAddress(address, popupHTML, token, map, draggable = false) {
    let id = Date.now() + Math.floor(Math.random() * 99999);
    geocode(address, token)
        .then(coords => {

            let popup = new mapboxgl.Popup()
                .setHTML(popupHTML);
            let marker = new mapboxgl.Marker({
                draggable
            })
                .setLngLat(coords)
                .addTo(map)
                .setPopup(popup);
            if (draggable) {
                function onDragEnd(e) {
                    const lngLat = e.target.getLngLat();
                }

                marker.on('dragend', onDragEnd);
            }
            popup.addTo(map);
            dynamicallyAddedMapObjectsArray.push({id, popup, marker});
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return id;
}

function placeMarkerAndPopupUsingCoords(coords, popupHTML, token, map, draggable = false) {
    let id = Date.now() + Math.floor(Math.random() * 99999);
    let popup = new mapboxgl.Popup()
        .setHTML(popupHTML);
    let marker = new mapboxgl.Marker({
        draggable
    })
        .setLngLat(coords)
        .addTo(map)
        .setPopup(popup);
    if (draggable) {
        function onDragEnd(e) {
            const lngLat = e.target.getLngLat();

            reverseGeocode(lngLat, MAPBOX_TOKEN)
                .then((result) => {
                    popupHTML = `<div>${JSON.stringify(lngLat, null, 2)}</div>\n`;
                    popupHTML += `<div>${result}</div>\n`;
                    popup.setHTML(popupHTML);
                    popup.addTo(map);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        marker.on('dragend', onDragEnd);
    }
    dynamicallyAddedMapObjectsArray.push({id, popup, marker});
    popup.addTo(map);
    return id;
}

function executeTests(id = 0) {
    switch (id) {
        case 1:
            setTimeout(function () {
                map.setZoom(14.34); //set map zoom level for desktop size
            }, 3000);
            break;

        case 2:
            setTimeout(function () {
                map.setZoom(11); //set map zoom level for mobile size
            }, 3000);
            break;

        case 3:
            setTimeout(function () {
                setCurrentPosition();
            }, 3000);
            break;

        case 4:
            let address = "2174 W Fairwood Dr, Taylorsville, UT 84129";
            let popupHTML = "<p>Welcome to the 2174 W Fairwood Dr, Taylorsville, UT 84129!</p>";
            placeMarkerAndPopupUsingAddress(address, popupHTML, MAPBOX_TOKEN, map, false);
            break;

        case 5:
            let popupLocationCoordsArray = [-111.9462511, 40.6466734];
            let popupCoordsHTML = `<div>${JSON.stringify(popupLocationCoordsArray, null, 2)}</div>\n`;
            placeMarkerAndPopupUsingCoords(popupLocationCoordsArray, popupCoordsHTML, MAPBOX_TOKEN, map, false);
            break;

        case 6:
            geocode("548 W 4500 S, Murray, UT 84123", MAPBOX_TOKEN)
                .then(result => {
                    map.setCenter(result);
                    map.setZoom(18);
                });
            break;

        case 7:
            reverseGeocode({lng: -98.4861, lat: 29.4260}, MAPBOX_TOKEN)
                .then(results => {
                    map.setCenter([-98.4861, 29.4260]);
                    map.setZoom(15);
                });
            break;

        default:
            break;
    }
}

let testId = 0;

// executeTests(testId);

// setTimeout(function () {
//     dynamicallyAddedMapObjectsArray.forEach((mapObject) => {
//         console.log(mapObject);
//         let clickableItem = mapObject.marker.getElement();
//         console.log(clickableItem);
//         clickableItem.addEventListener('click', function (e) {
//             console.log("marker clicked:", mapObject);
//         });
//     });
// }, 2000);

// setTimeout(function () {
//     dynamicallyAddedMapObjectsArray.forEach((mapObject) => {
//         console.log(mapObject);
//         mapObject.marker.togglePopup();
//     });
// }, 3000);

// setTimeout(function () {
//     dynamicallyAddedMapObjectsArray.forEach((mapObject) => {
//         console.log(mapObject);
//         mapObject.marker.togglePopup();
//     });
// }, 4000);
