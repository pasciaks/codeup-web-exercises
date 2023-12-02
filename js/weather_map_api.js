"use strict";

(() => {

    let findButton = null;
    let homeButton = null;
    let findInput = null;
    let findForm = null;

    let favorites = [];

    let dynamicallyAddedMapObjectsArray = [];

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [-111.9462511, 40.6466734], // starting position [lng, lat]
        zoom: 2, // starting zoom // 5 // 15 // 20 // 25
    });

    map.addControl(new mapboxgl.NavigationControl());

    map.on('style.load', function () {
        map.on('dblclick', async function (e) {
            setTitle("Loading...");
            let lngLat = e.lngLat;
            getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
            let address = await reverseGeocode(lngLat, MAPBOX_TOKEN);
            placeMarkerAndPopupUsingCoords(
                lngLat,
                `<div>${address}</div>`,
                MAPBOX_TOKEN,
                map,
                true);
            favorites.push({address, lngLat});
            console.log(favorites);
            map.flyTo({
                center: lngLat,
                zoom: 10
            });
        });
    });

    /**
     * getCurrentPosition is a method that will obtain the current gps position of the user
     *
     * @param allowMapFlyTo - boolean, default true, will allow the map to fly to the current position
     * @param setZoom - integer, default 15, will set the zoom level of the map if allowMapFlyTo is true
     * @returns {Promise<void>}
     */
    const getCurrentPosition = (allowMapFlyTo = true, setZoom = 15) => {
        try {
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
        } catch (error) {
            console.error(error);
            return error;
        }
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
            .then(data => {
                let tempTitle = data?.features[0]?.place_name || "No results found";
                setTitle(tempTitle);
                return data.features[0].center;
            })
            .catch((error) => {
                console.error('Error:', error);
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
                return error;
            });
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
            .then(data => {
                let tempTitle = data?.features[0]?.place_name || "No results found";
                setTitle(tempTitle);
                return tempTitle; // data.features[0].place_name;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
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
                favorites.push({address, coords});
                console.log(favorites);
                if (draggable) {
                    function onDragEnd(e) {
                        const lngLat = e.target.getLngLat();
                        getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
                        favorites.push({address, lngLat});
                        console.log(favorites);
                        popupHTML = `<div>${address}</div>`;
                        popup.setHTML(popupHTML);
                        popup.addTo(map);
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
                getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
                reverseGeocode(lngLat, MAPBOX_TOKEN)
                    .then((address) => {
                        favorites.push({address, lngLat});
                        console.log(favorites);
                        setTitle(address);
                        popupHTML = `<div>${address}</div>`;
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

    let forecastData = {
        "cod": "200",
        "message": 0,
        "cnt": 40,
        "list": [
            {
                "dt": 1701453600,
                "main": {
                    "temp": 34.11,
                    "feels_like": 29.05,
                    "temp_min": 34.11,
                    "temp_max": 37.11,
                    "pressure": 1011,
                    "sea_level": 1011,
                    "grnd_level": 861,
                    "humidity": 84,
                    "temp_kf": -1.67
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 5.59,
                    "deg": 218,
                    "gust": 8.57
                },
                "visibility": 9162,
                "pop": 0.5,
                "snow": {
                    "3h": 0.11
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-01 18:00:00"
            },
            {
                "dt": 1701464400,
                "main": {
                    "temp": 34.05,
                    "feels_like": 30.34,
                    "temp_min": 33.94,
                    "temp_max": 34.05,
                    "pressure": 1012,
                    "sea_level": 1012,
                    "grnd_level": 862,
                    "humidity": 84,
                    "temp_kf": 0.06
                },
                "weather": [
                    {
                        "id": 601,
                        "main": "Snow",
                        "description": "snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.09,
                    "deg": 341,
                    "gust": 7.49
                },
                "visibility": 9758,
                "pop": 0.88,
                "snow": {
                    "3h": 3.82
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-01 21:00:00"
            },
            {
                "dt": 1701475200,
                "main": {
                    "temp": 31.57,
                    "feels_like": 31.57,
                    "temp_min": 30.29,
                    "temp_max": 31.57,
                    "pressure": 1014,
                    "sea_level": 1014,
                    "grnd_level": 862,
                    "humidity": 85,
                    "temp_kf": 0.71
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 92
                },
                "wind": {
                    "speed": 0.51,
                    "deg": 84,
                    "gust": 2.86
                },
                "visibility": 10000,
                "pop": 0.85,
                "snow": {
                    "3h": 0.39
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-02 00:00:00"
            },
            {
                "dt": 1701486000,
                "main": {
                    "temp": 31.08,
                    "feels_like": 27.77,
                    "temp_min": 31.08,
                    "temp_max": 31.08,
                    "pressure": 1018,
                    "sea_level": 1018,
                    "grnd_level": 863,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 95
                },
                "wind": {
                    "speed": 3.38,
                    "deg": 209,
                    "gust": 5.3
                },
                "visibility": 435,
                "pop": 0.4,
                "snow": {
                    "3h": 0.32
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-02 03:00:00"
            },
            {
                "dt": 1701496800,
                "main": {
                    "temp": 30.99,
                    "feels_like": 24.8,
                    "temp_min": 30.99,
                    "temp_max": 30.99,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 863,
                    "humidity": 89,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 98
                },
                "wind": {
                    "speed": 6.29,
                    "deg": 195,
                    "gust": 11.01
                },
                "visibility": 8734,
                "pop": 0.69,
                "snow": {
                    "3h": 0.92
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-02 06:00:00"
            },
            {
                "dt": 1701507600,
                "main": {
                    "temp": 31.23,
                    "feels_like": 24.69,
                    "temp_min": 31.23,
                    "temp_max": 31.23,
                    "pressure": 1018,
                    "sea_level": 1018,
                    "grnd_level": 864,
                    "humidity": 85,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 98
                },
                "wind": {
                    "speed": 6.82,
                    "deg": 262,
                    "gust": 14.25
                },
                "visibility": 10000,
                "pop": 0.86,
                "snow": {
                    "3h": 0.93
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-02 09:00:00"
            },
            {
                "dt": 1701518400,
                "main": {
                    "temp": 31.87,
                    "feels_like": 28.4,
                    "temp_min": 31.87,
                    "temp_max": 31.87,
                    "pressure": 1020,
                    "sea_level": 1020,
                    "grnd_level": 866,
                    "humidity": 92,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 99
                },
                "wind": {
                    "speed": 3.6,
                    "deg": 232,
                    "gust": 7.23
                },
                "visibility": 2371,
                "pop": 0.86,
                "snow": {
                    "3h": 0.68
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-02 12:00:00"
            },
            {
                "dt": 1701529200,
                "main": {
                    "temp": 29.59,
                    "feels_like": 24.08,
                    "temp_min": 29.59,
                    "temp_max": 29.59,
                    "pressure": 1022,
                    "sea_level": 1022,
                    "grnd_level": 867,
                    "humidity": 92,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 96
                },
                "wind": {
                    "speed": 5.17,
                    "deg": 162,
                    "gust": 7.92
                },
                "visibility": 10000,
                "pop": 0.52,
                "snow": {
                    "3h": 0.24
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-02 15:00:00"
            },
            {
                "dt": 1701540000,
                "main": {
                    "temp": 36.05,
                    "feels_like": 30.52,
                    "temp_min": 36.05,
                    "temp_max": 36.05,
                    "pressure": 1021,
                    "sea_level": 1021,
                    "grnd_level": 867,
                    "humidity": 80,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 94
                },
                "wind": {
                    "speed": 6.78,
                    "deg": 178,
                    "gust": 11.34
                },
                "visibility": 10000,
                "pop": 0.44,
                "snow": {
                    "3h": 0.14
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-02 18:00:00"
            },
            {
                "dt": 1701550800,
                "main": {
                    "temp": 38.55,
                    "feels_like": 32.31,
                    "temp_min": 38.55,
                    "temp_max": 38.55,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 865,
                    "humidity": 74,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 9.01,
                    "deg": 179,
                    "gust": 14.99
                },
                "visibility": 10000,
                "pop": 0.34,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-02 21:00:00"
            },
            {
                "dt": 1701561600,
                "main": {
                    "temp": 35.51,
                    "feels_like": 29.32,
                    "temp_min": 35.51,
                    "temp_max": 35.51,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 864,
                    "humidity": 84,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 7.67,
                    "deg": 175,
                    "gust": 14.9
                },
                "visibility": 3313,
                "pop": 0.65,
                "snow": {
                    "3h": 0.75
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-03 00:00:00"
            },
            {
                "dt": 1701572400,
                "main": {
                    "temp": 35.11,
                    "feels_like": 28.36,
                    "temp_min": 35.11,
                    "temp_max": 35.11,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 864,
                    "humidity": 90,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 600,
                        "main": "Snow",
                        "description": "light snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 8.5,
                    "deg": 177,
                    "gust": 14.9
                },
                "visibility": 10000,
                "pop": 0.75,
                "snow": {
                    "3h": 1.38
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-03 03:00:00"
            },
            {
                "dt": 1701583200,
                "main": {
                    "temp": 36.39,
                    "feels_like": 31.06,
                    "temp_min": 36.39,
                    "temp_max": 36.39,
                    "pressure": 1017,
                    "sea_level": 1017,
                    "grnd_level": 864,
                    "humidity": 86,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 6.58,
                    "deg": 204,
                    "gust": 13.11
                },
                "visibility": 10000,
                "pop": 0.67,
                "rain": {
                    "3h": 0.94
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-03 06:00:00"
            },
            {
                "dt": 1701594000,
                "main": {
                    "temp": 35.82,
                    "feels_like": 32.02,
                    "temp_min": 35.82,
                    "temp_max": 35.82,
                    "pressure": 1018,
                    "sea_level": 1018,
                    "grnd_level": 865,
                    "humidity": 97,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 601,
                        "main": "Snow",
                        "description": "snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.47,
                    "deg": 202,
                    "gust": 9.51
                },
                "visibility": 188,
                "pop": 0.94,
                "snow": {
                    "3h": 2.59
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-03 09:00:00"
            },
            {
                "dt": 1701604800,
                "main": {
                    "temp": 35.92,
                    "feels_like": 32.94,
                    "temp_min": 35.92,
                    "temp_max": 35.92,
                    "pressure": 1019,
                    "sea_level": 1019,
                    "grnd_level": 866,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 601,
                        "main": "Snow",
                        "description": "snow",
                        "icon": "13n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.69,
                    "deg": 190,
                    "gust": 7.49
                },
                "visibility": 47,
                "pop": 1,
                "snow": {
                    "3h": 3.77
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-03 12:00:00"
            },
            {
                "dt": 1701615600,
                "main": {
                    "temp": 35.85,
                    "feels_like": 32.2,
                    "temp_min": 35.85,
                    "temp_max": 35.85,
                    "pressure": 1022,
                    "sea_level": 1022,
                    "grnd_level": 869,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 601,
                        "main": "Snow",
                        "description": "snow",
                        "icon": "13d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.34,
                    "deg": 189,
                    "gust": 7.43
                },
                "visibility": 51,
                "pop": 0.92,
                "snow": {
                    "3h": 4.57
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-03 15:00:00"
            },
            {
                "dt": 1701626400,
                "main": {
                    "temp": 37.51,
                    "feels_like": 32.86,
                    "temp_min": 37.51,
                    "temp_max": 37.51,
                    "pressure": 1024,
                    "sea_level": 1024,
                    "grnd_level": 870,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 5.88,
                    "deg": 176,
                    "gust": 10.92
                },
                "visibility": 55,
                "pop": 0.9,
                "rain": {
                    "3h": 2.13
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-03 18:00:00"
            },
            {
                "dt": 1701637200,
                "main": {
                    "temp": 38.55,
                    "feels_like": 34.57,
                    "temp_min": 38.55,
                    "temp_max": 38.55,
                    "pressure": 1023,
                    "sea_level": 1023,
                    "grnd_level": 870,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 5.26,
                    "deg": 168,
                    "gust": 9.13
                },
                "visibility": 84,
                "pop": 0.91,
                "rain": {
                    "3h": 0.49
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-03 21:00:00"
            },
            {
                "dt": 1701648000,
                "main": {
                    "temp": 38.28,
                    "feels_like": 35.46,
                    "temp_min": 38.28,
                    "temp_max": 38.28,
                    "pressure": 1024,
                    "sea_level": 1024,
                    "grnd_level": 871,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.87,
                    "deg": 177,
                    "gust": 7.87
                },
                "visibility": 161,
                "pop": 0.94,
                "rain": {
                    "3h": 1.1
                },
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-04 00:00:00"
            },
            {
                "dt": 1701658800,
                "main": {
                    "temp": 38.44,
                    "feels_like": 35.17,
                    "temp_min": 38.44,
                    "temp_max": 38.44,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 872,
                    "humidity": 98,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.38,
                    "deg": 178,
                    "gust": 8.32
                },
                "visibility": 331,
                "pop": 0.95,
                "rain": {
                    "3h": 1.76
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-04 03:00:00"
            },
            {
                "dt": 1701669600,
                "main": {
                    "temp": 38.91,
                    "feels_like": 36.25,
                    "temp_min": 38.91,
                    "temp_max": 38.91,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 872,
                    "humidity": 98,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 3.8,
                    "deg": 183,
                    "gust": 6.87
                },
                "visibility": 1832,
                "pop": 0.95,
                "rain": {
                    "3h": 1.4
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-04 06:00:00"
            },
            {
                "dt": 1701680400,
                "main": {
                    "temp": 39.04,
                    "feels_like": 35.42,
                    "temp_min": 39.04,
                    "temp_max": 39.04,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 872,
                    "humidity": 98,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.9,
                    "deg": 166,
                    "gust": 7.63
                },
                "visibility": 4359,
                "pop": 0.78,
                "rain": {
                    "3h": 0.78
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-04 09:00:00"
            },
            {
                "dt": 1701691200,
                "main": {
                    "temp": 39.02,
                    "feels_like": 35.13,
                    "temp_min": 39.02,
                    "temp_max": 39.02,
                    "pressure": 1026,
                    "sea_level": 1026,
                    "grnd_level": 873,
                    "humidity": 99,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 500,
                        "main": "Rain",
                        "description": "light rain",
                        "icon": "10n"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 5.23,
                    "deg": 159,
                    "gust": 8.25
                },
                "visibility": 210,
                "pop": 0.61,
                "rain": {
                    "3h": 0.13
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-04 12:00:00"
            },
            {
                "dt": 1701702000,
                "main": {
                    "temp": 39.09,
                    "feels_like": 35.49,
                    "temp_min": 39.09,
                    "temp_max": 39.09,
                    "pressure": 1027,
                    "sea_level": 1027,
                    "grnd_level": 873,
                    "humidity": 97,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 100
                },
                "wind": {
                    "speed": 4.9,
                    "deg": 159,
                    "gust": 7.52
                },
                "visibility": 6096,
                "pop": 0.15,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-04 15:00:00"
            },
            {
                "dt": 1701712800,
                "main": {
                    "temp": 42.31,
                    "feels_like": 39.09,
                    "temp_min": 42.31,
                    "temp_max": 42.31,
                    "pressure": 1027,
                    "sea_level": 1027,
                    "grnd_level": 874,
                    "humidity": 90,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 804,
                        "main": "Clouds",
                        "description": "overcast clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 96
                },
                "wind": {
                    "speed": 5.14,
                    "deg": 160,
                    "gust": 6.71
                },
                "visibility": 8231,
                "pop": 0.13,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-04 18:00:00"
            },
            {
                "dt": 1701723600,
                "main": {
                    "temp": 44.24,
                    "feels_like": 41.54,
                    "temp_min": 44.24,
                    "temp_max": 44.24,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 873,
                    "humidity": 83,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 72
                },
                "wind": {
                    "speed": 4.88,
                    "deg": 162,
                    "gust": 6.26
                },
                "visibility": 8296,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-04 21:00:00"
            },
            {
                "dt": 1701734400,
                "main": {
                    "temp": 40.33,
                    "feels_like": 38.53,
                    "temp_min": 40.33,
                    "temp_max": 40.33,
                    "pressure": 1026,
                    "sea_level": 1026,
                    "grnd_level": 874,
                    "humidity": 88,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 65
                },
                "wind": {
                    "speed": 3.18,
                    "deg": 140,
                    "gust": 4.56
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-05 00:00:00"
            },
            {
                "dt": 1701745200,
                "main": {
                    "temp": 38.07,
                    "feels_like": 34.5,
                    "temp_min": 38.07,
                    "temp_max": 38.07,
                    "pressure": 1029,
                    "sea_level": 1029,
                    "grnd_level": 875,
                    "humidity": 82,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 14
                },
                "wind": {
                    "speed": 4.63,
                    "deg": 148,
                    "gust": 5.91
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-05 03:00:00"
            },
            {
                "dt": 1701756000,
                "main": {
                    "temp": 37.17,
                    "feels_like": 33.46,
                    "temp_min": 37.17,
                    "temp_max": 37.17,
                    "pressure": 1029,
                    "sea_level": 1029,
                    "grnd_level": 875,
                    "humidity": 81,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 14
                },
                "wind": {
                    "speed": 4.63,
                    "deg": 145,
                    "gust": 6.29
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-05 06:00:00"
            },
            {
                "dt": 1701766800,
                "main": {
                    "temp": 36.59,
                    "feels_like": 32.95,
                    "temp_min": 36.59,
                    "temp_max": 36.59,
                    "pressure": 1029,
                    "sea_level": 1029,
                    "grnd_level": 875,
                    "humidity": 81,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "clouds": {
                    "all": 7
                },
                "wind": {
                    "speed": 4.45,
                    "deg": 142,
                    "gust": 5.41
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-05 09:00:00"
            },
            {
                "dt": 1701777600,
                "main": {
                    "temp": 36.32,
                    "feels_like": 32.45,
                    "temp_min": 36.32,
                    "temp_max": 36.32,
                    "pressure": 1029,
                    "sea_level": 1029,
                    "grnd_level": 875,
                    "humidity": 81,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "clouds": {
                    "all": 5
                },
                "wind": {
                    "speed": 4.65,
                    "deg": 146,
                    "gust": 5.88
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-05 12:00:00"
            },
            {
                "dt": 1701788400,
                "main": {
                    "temp": 36.23,
                    "feels_like": 32.92,
                    "temp_min": 36.23,
                    "temp_max": 36.23,
                    "pressure": 1029,
                    "sea_level": 1029,
                    "grnd_level": 875,
                    "humidity": 80,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01d"
                    }
                ],
                "clouds": {
                    "all": 5
                },
                "wind": {
                    "speed": 4.05,
                    "deg": 147,
                    "gust": 5.08
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-05 15:00:00"
            },
            {
                "dt": 1701799200,
                "main": {
                    "temp": 43.7,
                    "feels_like": 41.88,
                    "temp_min": 43.7,
                    "temp_max": 43.7,
                    "pressure": 1027,
                    "sea_level": 1027,
                    "grnd_level": 875,
                    "humidity": 75,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01d"
                    }
                ],
                "clouds": {
                    "all": 7
                },
                "wind": {
                    "speed": 3.67,
                    "deg": 153,
                    "gust": 4.45
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-05 18:00:00"
            },
            {
                "dt": 1701810000,
                "main": {
                    "temp": 45.68,
                    "feels_like": 45.68,
                    "temp_min": 45.68,
                    "temp_max": 45.68,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 874,
                    "humidity": 73,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 57
                },
                "wind": {
                    "speed": 2.75,
                    "deg": 125,
                    "gust": 3.94
                },
                "visibility": 9482,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-05 21:00:00"
            },
            {
                "dt": 1701820800,
                "main": {
                    "temp": 40.91,
                    "feels_like": 40.91,
                    "temp_min": 40.91,
                    "temp_max": 40.91,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 873,
                    "humidity": 82,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 51
                },
                "wind": {
                    "speed": 2.55,
                    "deg": 127,
                    "gust": 3.96
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-06 00:00:00"
            },
            {
                "dt": 1701831600,
                "main": {
                    "temp": 39.33,
                    "feels_like": 36.3,
                    "temp_min": 39.33,
                    "temp_max": 39.33,
                    "pressure": 1026,
                    "sea_level": 1026,
                    "grnd_level": 873,
                    "humidity": 75,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01n"
                    }
                ],
                "clouds": {
                    "all": 10
                },
                "wind": {
                    "speed": 4.25,
                    "deg": 149,
                    "gust": 5.3
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-06 03:00:00"
            },
            {
                "dt": 1701842400,
                "main": {
                    "temp": 38.55,
                    "feels_like": 34.25,
                    "temp_min": 38.55,
                    "temp_max": 38.55,
                    "pressure": 1026,
                    "sea_level": 1026,
                    "grnd_level": 873,
                    "humidity": 75,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 18
                },
                "wind": {
                    "speed": 5.68,
                    "deg": 148,
                    "gust": 7.65
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-06 06:00:00"
            },
            {
                "dt": 1701853200,
                "main": {
                    "temp": 38.17,
                    "feels_like": 33.46,
                    "temp_min": 38.17,
                    "temp_max": 38.17,
                    "pressure": 1025,
                    "sea_level": 1025,
                    "grnd_level": 872,
                    "humidity": 74,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 801,
                        "main": "Clouds",
                        "description": "few clouds",
                        "icon": "02n"
                    }
                ],
                "clouds": {
                    "all": 19
                },
                "wind": {
                    "speed": 6.17,
                    "deg": 151,
                    "gust": 8.57
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-06 09:00:00"
            },
            {
                "dt": 1701864000,
                "main": {
                    "temp": 37.9,
                    "feels_like": 33.37,
                    "temp_min": 37.9,
                    "temp_max": 37.9,
                    "pressure": 1024,
                    "sea_level": 1024,
                    "grnd_level": 871,
                    "humidity": 71,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 802,
                        "main": "Clouds",
                        "description": "scattered clouds",
                        "icon": "03n"
                    }
                ],
                "clouds": {
                    "all": 45
                },
                "wind": {
                    "speed": 5.86,
                    "deg": 154,
                    "gust": 7.74
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2023-12-06 12:00:00"
            },
            {
                "dt": 1701874800,
                "main": {
                    "temp": 38.17,
                    "feels_like": 33.94,
                    "temp_min": 38.17,
                    "temp_max": 38.17,
                    "pressure": 1024,
                    "sea_level": 1024,
                    "grnd_level": 871,
                    "humidity": 68,
                    "temp_kf": 0
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04d"
                    }
                ],
                "clouds": {
                    "all": 72
                },
                "wind": {
                    "speed": 5.5,
                    "deg": 158,
                    "gust": 7.09
                },
                "visibility": 10000,
                "pop": 0,
                "sys": {
                    "pod": "d"
                },
                "dt_txt": "2023-12-06 15:00:00"
            }
        ],
        "city": {
            "id": 5782476,
            "name": "Taylorsville",
            "coord": {
                "lat": 40.6467,
                "lon": -111.9463
            },
            "country": "US",
            "population": 58652,
            "timezone": -25200,
            "sunrise": 1701441139,
            "sunset": 1701475299
        }
    };

    function convertTime(epoch) {
        return new Date(epoch * 1000).toDateString();
    }

    function forecastByCoords(lat, lon) {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                // @todo - show modal error
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
                return null;
            });
    }

    function forecastByCity(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                // @todo - show modal error
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
                return null;
            });
    }

    let forecastContainer = document.getElementById("forecast-container");

    async function getForecastFromCurrentGpsPosition() {
        setTitle("Your current GPS Location.")
        const getCoords = async () => {
            const pos = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return {
                lng: pos.coords.longitude,
                lat: pos.coords.latitude,
            };
        };

        const coords = await getCoords();
        reverseGeocode(coords, MAPBOX_TOKEN).then((data) => {
            setTitle(`${data}`);
        });
        forecastData = await getForecastFromSpecificGpsPosition(coords);

        postToUpload(forecastData);

        return forecastData;
    }

    async function getForecastFromCity(city) {
        setTitle(`${city}`);
        forecastData = await forecastByCity(city)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                setTitle(`...`);
            })
        return forecastData;
    }

    async function getForecastFromSpecificGpsPosition(lngLat) {
        setTitle(`${lngLat.lat}, ${lngLat.lng}`);
        map.flyTo({
            center: lngLat,
            zoom: 10
        });
        forecastData = await forecastByCoords(lngLat.lat, lngLat.lng)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
                setTitle(`...`);
            })
        return forecastData;
    }

    function renderForecast() {

        forecastContainer.innerHTML = "";

        for (let i = 0; i < forecastData.list.length; i += 8) {
            let forecastItem = forecastData.list[i];
            let forecastItemElement = document.createElement("div");
            forecastItemElement.classList.add("forecast-item");
            forecastItemElement.classList.add("card");
            forecastItemElement.title = forecastItem.weather[0].description + "\n\n" + forecastItem.main.temp + "°F";

            let forecastItemImg = document.createElement("img");
            forecastItemImg.classList.add("img-responsive");
            forecastItemImg.classList.add("card-img-top");
            forecastItemImg.src = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;

            let forecastItemBody = document.createElement("div");
            forecastItemBody.classList.add("card-body");

            let forecastItemDetail = document.createElement("div");
            forecastItemDetail.classList.add("card-detail");
            forecastItemDetail.innerText = forecastItem.weather[0].description;

            let forecastItemTemperatureMin = document.createElement("div");
            forecastItemTemperatureMin.classList.add("card-temperature-min");
            forecastItemTemperatureMin.innerText = forecastItem.main.temp_min + "°F";

            let forecastItemTemperatureMax = document.createElement("div");
            forecastItemTemperatureMax.classList.add("card-temperature-max");
            forecastItemTemperatureMax.innerText = forecastItem.main.temp_max + "°F";

            let forecastItemHumidity = document.createElement("div");
            forecastItemHumidity.classList.add("card-humidity");
            forecastItemHumidity.innerText = forecastItem.main.humidity + "%";

            let forecastItemWindSpeed = document.createElement("div");
            forecastItemWindSpeed.classList.add("card-wind");
            forecastItemWindSpeed.innerText = forecastItem.wind.speed + "mph";

            let forecastItemWindDirection = document.createElement("div");
            forecastItemWindDirection.classList.add("card-wind-direction");
            forecastItemWindDirection.innerText = forecastItem.wind.deg + "°";

            let forecastItemPressure = document.createElement("div");
            forecastItemPressure.classList.add("card-pressure");
            forecastItemPressure.innerText = forecastItem.main.pressure + "hPa";

            let forecastItemTitle = document.createElement("h5");
            forecastItemTitle.classList.add("card-title");
            forecastItemTitle.innerText = convertTime(forecastItem.dt);

            let forecastItemText = document.createElement("p");
            forecastItemText.classList.add("card-text");
            forecastItemText.innerText = forecastItem.weather[0].description;

            let fullDateTime = document.createElement("div");
            fullDateTime.classList.add("card-full-date-time");
            fullDateTime.innerText = new Date(forecastItem.dt_txt).toLocaleString();

            forecastItemBody.appendChild(forecastItemTitle);
            forecastItemBody.appendChild(fullDateTime);

            forecastItemBody.appendChild(forecastItemTemperatureMin);
            forecastItemBody.appendChild(forecastItemTemperatureMax);
            forecastItemBody.appendChild(forecastItemHumidity);
            forecastItemBody.appendChild(forecastItemWindSpeed);
            forecastItemBody.appendChild(forecastItemWindDirection);
            forecastItemBody.appendChild(forecastItemPressure);

            // forecastItemBody.appendChild(forecastItemDetail);

            forecastItemBody.appendChild(forecastItemTitle);

            // forecastItemBody.appendChild(forecastItemText);

            forecastItemElement.appendChild(forecastItemImg);
            forecastItemElement.appendChild(forecastItemBody);

            forecastContainer.appendChild(forecastItemElement);

            document.querySelector("#modalClose").click();
        }
    }

    function getLiveForecastDataFromCurrentGpsLocation() {
        getForecastFromCurrentGpsPosition()
            .then((data) => {
                renderForecast();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLiveForecastDataFromGpsCoords(coords) {

        setTitle(`${coords.lat}, ${coords.lng}`);

        getForecastFromSpecificGpsPosition(coords)
            .then((data) => {
                renderForecast();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLiveForecastFromCity(city) {

        setTitle(`${city}`);

        getForecastFromCity(city)
            .then((data) => {
                renderForecast();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function submitForm(event) {
        event.preventDefault();

        let city = findInput?.value || "";

        setTitle(`${city} ...`);

        placeMarkerAndPopupUsingAddress(
            city,
            `<div>${city}</div>`,
            MAPBOX_TOKEN,
            map,
            false);

        geocode(city, MAPBOX_TOKEN)
            .then((lngLat) => {
                map.flyTo({
                    center: lngLat,
                    zoom: 10
                });
            })
            .then(() => {
                getLiveForecastFromCity(city);
            })
            .catch((error) => {
                console.log(error);
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
            });

    }

    function modal(mhead, mbody) {
        let modalHead = document.querySelector("#modalHead");
        let modalBody = document.querySelector("#modalBody");
        modalHead.innerText = mhead;
        modalBody.innerHTML = mbody;
        document.querySelector("#modal").classList.add("show");
        document.querySelector("#modal").style.display = "block";
        document.querySelector("#modalClose").addEventListener("click", () => {
            document.querySelector("#modal").classList.remove("show");
            document.querySelector('#modal').removeAttribute("style");
        }, {once: true});
    }

    function setTitle(title) {
        document.title = title;
        document.getElementById("title").innerText = title;
    }

    function init() {

        findForm = document.getElementById("form-find");
        findButton = document.getElementById("btn-find");
        homeButton = document.getElementById("btn-home");
        findInput = document.getElementById("input-find");

        findForm.addEventListener("submit", (e) => {
            e.preventDefault();
            submitForm(e);
        });

        findButton.addEventListener("click", (e) => {
            submitForm(e);
        });

        homeButton.addEventListener("click", (e) => {

            findInput.value = "";

            getLiveForecastDataFromCurrentGpsLocation();

            let mHead = "Getting Home Weather";

            let mBody = `
            <div class="modal-body text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            `;

            modal(mHead, mBody);
        });

    }

    init();

    function postToUpload(forecastData) {
        let data = new FormData();
        let file = new Blob([JSON.stringify(forecastData)], {type: "application/json"});
        data.append('file1', file);
        fetch('https://pasciak.com:8181/upload', {
            method: 'POST',
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                document.getElementById("uploaded").innerHTML = `<a target='_blank' href='https://pasciak.com/weather_buddy/uploads/${data.file_uploaded}.json'>*</a>`;
            })
            .catch((error) => {
                console.error(error);
            });
    }

// todo: better formatting of weather data
// todo: show wind direction and speed on map
// todo: track own historical data from backend
// todo: trap all errors and show modal error
// todo: consider implementing favorites
// todo: consider implementing backend to store favorites and other user's search data
// todo: consider adding live 'sky' view or 'upload' view like gas buddy but for live weather views
// todo: consider 'How Hot It Is... ' for indoor use of webcam to show the 'current capacity/clientele' of a place
// todo: implement drop down menu or off canvas menu for accessing favorites
// todo: allow re-query frequency to auto update from favorites and store in database
// todo: show current forecast details or chart/graphs in popups
// todo: check for duplicate calls to title, document.getElementById("title").innerText = title, etc...
// todo: optimize calls for data... don't call if already have data, much more, but lower priority.
// TODO: Trap for errors or not found cities ... {"cod":"404","message":"city not found"}
// todo: lancaster PA, etc...
// todo: consider the dataset and don't simply just show every 8, allow some type of use of all that data...

// todo: click on one box of forecast and show all the data for that day in a modal
// todo: take away the title hover in the forecast boxes and show the data in a modal

// todo: different icon if it is a draggable marker or not
// todo: different icon based on the weather , temp, etc...

})();