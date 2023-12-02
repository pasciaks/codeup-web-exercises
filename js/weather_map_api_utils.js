// "use strict";
//
// let dynamicallyAddedMapObjectsArray = [];
//
// /**
//  * getCurrentPosition is a method that will obtain the current gps position of the user
//  *
//  * @param allowMapFlyTo - boolean, default true, will allow the map to fly to the current position
//  * @param setZoom - integer, default 15, will set the zoom level of the map if allowMapFlyTo is true
//  * @returns {Promise<void>}
//  */
// const getCurrentPosition = (allowMapFlyTo = true, setZoom = 15) => {
//     try {
//         navigator.geolocation.getCurrentPosition(function (navPosObj) {
//             let resultObject = {
//                 "lng": navPosObj.coords.longitude,
//                 "lat": navPosObj.coords.latitude
//             }
//             if (allowMapFlyTo) {
//                 map.flyTo({center: [resultObject.lng, resultObject.lat], zoom: setZoom});
//             }
//             return resultObject;
//         });
//     } catch (error) {
//         console.error(error);
//         return error;
//     }
// }
//
// /**
//  * geocode is a method to search for coordinates based on a physical address and return
//  *
//  * @param {string} search is the address to search for the geocoded coordinates
//  * @param {string} token is your API token for MapBox
//  * @returns {Promise} a promise containing the latitude and longitude as a two element array
//  *
//  * EXAMPLE:
//  *
//  *  geocode("San Antonio", API_TOKEN_HERE).then(function(results) {
//  *      // do something with results
//  *  })
//  *
//  */
// function geocode(search, token) {
//     let baseUrl = 'https://api.mapbox.com';
//     let endPoint = '/geocoding/v5/mapbox.places/';
//
//     return fetch(`${baseUrl}${endPoint}${encodeURIComponent(search)}.json?access_token=${token}`)
//         .then(res => res.json())
//         // to get all the data from the request, comment out the following three lines...
//         .then(data => {
//             let tempTitle = data?.features[0]?.place_name || "No results found";
//             setTitle(tempTitle);
//             return data.features[0].center;
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             let mHead = "ERROR"
//             let mBody = `${JSON.stringify(error, null, 2)}`;
//             modal(mHead, mBody);
//             return error;
//         });
// }
//
// /***
//  * reverseGeocode is a method to search for a physical address based on inputted coordinates
//  *
//  * @param {object} coordinates is an object with properties "lat" and "lng" for latitude and longitude
//  * @param {string} token is your API token for MapBox
//  * @returns {Promise} a promise containing the result
//  *
//  * EXAMPLE:
//  *
//  *  reverseGeocode({lat: 32.77, lng: -96.79}, API_TOKEN_HERE).then(function(results) {
//  *      // do something with results
//  *  })
//  *
//  */
// function reverseGeocode(coordinates, token) {
//     let baseUrl = 'https://api.mapbox.com';
//     let endPoint = '/geocoding/v5/mapbox.places/';
//     return fetch(`${baseUrl}${endPoint}${coordinates.lng},${coordinates.lat}.json?access_token=${token}`)
//         .then(res => res.json())
//         // to get all the data from the request, comment out the following three lines...
//         .then(data => {
//             let tempTitle = data?.features[0]?.place_name || "No results found";
//             setTitle(tempTitle);
//             return tempTitle; // data.features[0].place_name;
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             return error;
//         });
// }
//
// function placeMarkerAndPopupUsingAddress(address, popupHTML, token, map, draggable = false) {
//     let id = Date.now() + Math.floor(Math.random() * 99999);
//     geocode(address, token)
//         .then(coords => {
//             let popup = new mapboxgl.Popup()
//                 .setHTML(popupHTML);
//             let marker = new mapboxgl.Marker({
//                 draggable
//             })
//                 .setLngLat(coords)
//                 .addTo(map)
//                 .setPopup(popup);
//             favorites.push({address, coords});
//             console.log(favorites);
//             if (draggable) {
//                 function onDragEnd(e) {
//                     const lngLat = e.target.getLngLat();
//                     getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
//                     favorites.push({address, lngLat});
//                     console.log(favorites);
//                     popupHTML = `<div>${address}</div>`;
//                     popup.setHTML(popupHTML);
//                     popup.addTo(map);
//                 }
//
//                 marker.on('dragend', onDragEnd);
//             }
//             popup.addTo(map);
//             dynamicallyAddedMapObjectsArray.push({id, popup, marker});
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     return id;
// }
//
// function placeMarkerAndPopupUsingCoords(coords, popupHTML, token, map, draggable = false) {
//     let id = Date.now() + Math.floor(Math.random() * 99999);
//     let popup = new mapboxgl.Popup()
//         .setHTML(popupHTML);
//     let marker = new mapboxgl.Marker({
//         draggable
//     })
//         .setLngLat(coords)
//         .addTo(map)
//         .setPopup(popup);
//     if (draggable) {
//         function onDragEnd(e) {
//             const lngLat = e.target.getLngLat();
//             getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
//             reverseGeocode(lngLat, MAPBOX_TOKEN)
//                 .then((address) => {
//                     favorites.push({address, lngLat});
//                     console.log(favorites);
//                     setTitle(address);
//                     popupHTML = `<div>${address}</div>`;
//                     popup.setHTML(popupHTML);
//                     popup.addTo(map);
//                 })
//                 .catch((error) => {
//                     console.error('Error:', error);
//                 });
//         }
//
//         marker.on('dragend', onDragEnd);
//     }
//     dynamicallyAddedMapObjectsArray.push({id, popup, marker});
//     popup.addTo(map);
//     return id;
// }
