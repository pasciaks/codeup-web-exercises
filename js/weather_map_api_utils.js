"use strict";

let dynamicallyAddedMapObjectsArray = [];

/**
 * getCurrentPosition is a method that will obtain the current gps position of the user
 *
 * @param allowMapFlyTo - boolean, default true, will allow the map to fly to the current position
 * @param setZoom - integer, default 15, will set the zoom level of the map if allowMapFlyTo is true
 * @returns {Promise<void>}
 */
const getCurrentPosition = (allowMapFlyTo = true, setZoom = 15) => {
    navigator.geolocation.getCurrentPosition(function (navPosObj) {
        let resultObject = {
            "lng": navPosObj.coords.longitude,
            "lat": navPosObj.coords.latitude
        }
        if (allowMapFlyTo) {
            map.flyTo({center: [resultObject.lng, resultObject.lat], zoom: setZoom});
        }
        return resultObject;
    });
}

/**
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
 * @returns {Promise} a promise containing the result
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
                    console.log(lngLat);
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
