"use strict";

(() => {

    let findButton = null;
    let homeButton = null;
    let loadButton = null;
    let findInput = null;
    let findForm = null;

    let forecastAutoIntervalTimer = null;

    let forecastRangeSlider = null;

    let currentForecastIndex = 0;

    let forecastData = [];

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
            e.preventDefault();
            setSubTitle("");
            setTitle("");
            let lngLat = e.lngLat;
            getLiveForecastDataFromGpsCoords(lngLat, WEATHER_API_KEY);
            let address = await reverseGeocode(lngLat, MAPBOX_TOKEN);
            placeMarkerAndPopupUsingCoords(
                lngLat,
                `<div>${address}</div>`,
                MAPBOX_TOKEN,
                map,
                true);
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
                if (!data || !data.features || !data.features[0].center) {
                    console.error("No coordinates found for address");
                    setSubTitle("No coordinates found for address");
                    return;
                }
                let tempTitle = data?.features[0]?.place_name || "No results found";
                setSubTitle(tempTitle);
                return data.features[0].center;
            })
            .catch((error) => {
                //console.error('Error:', error);
                // alert(error.message);
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
                setSubTitle(tempTitle);
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
                if (!coords.lng || !coords.lat) {
                    // console.error("No coordinates found for address");
                    setSubTitle("No coordinates found for address");
                    return;
                }
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

    function convertTime(epoch) {
        return new Date(epoch * 1000).toDateString();
    }

    function forecastByCoords(lat, lon) {

        forecastRangeSlider.value = 0; // start next results at first forecast
        currentForecastIndex = 0;

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                if (data?.cod !== "200") {
                    throw new Error("City not found.");
                }
                return data;
            })
            .catch((error) => {
                console.error(error);
                // alert(error.message);
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
                return null;
            });
    }

    function forecastByCity(city) {

        forecastRangeSlider.value = 0; // start next results at first forecast
        currentForecastIndex = 0;

        city = city.trim();

        setTitle(`${city}`);

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                if (data?.cod !== "200") {
                    throw new Error("City not found.");
                }
                return data;
            })
            .catch((error) => {
                let mHead = "ERROR"
                let mBody = `${JSON.stringify(error, null, 2)}`;
                modal(mHead, mBody);
                return null;
            });
    }

    let forecastContainer = document.getElementById("forecast-container");

    async function getForecastFromCurrentGpsPosition() {

        forecastRangeSlider.value = 0; // start next results at first forecast
        currentForecastIndex = 0;

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
            setSubTitle(data);
        });

        forecastData = await getForecastFromSpecificGpsPosition(coords);

        saveForecastData(forecastData).then();

        document.querySelector("#modalClose").click();

        return forecastData;
    }

    async function getForecastFromCity(city) {

        forecastData = await forecastByCity(city)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.error(error);
            })
        return forecastData;
    }

    async function getForecastFromSpecificGpsPosition(lngLat) {


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
                // setTitle(`...`);
            })
        return forecastData;
    }

    function degToCompass(num) {
        let val = Math.floor((num / 22.5) + 0.5);
        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    function renderForecast(forecastData) {

        if (forecastAutoIntervalTimer) {
            clearInterval(forecastAutoIntervalTimer);
        }

        forecastAutoIntervalTimer = setInterval(function () {
            currentForecastIndex += 1;
            if (currentForecastIndex >= 8) {
                currentForecastIndex = 0;
            }
            forecastRangeSlider.value = currentForecastIndex;
            renderForecast(forecastData);
        }, 5000);


        forecastContainer.innerHTML = "";

        console.log(forecastData);

        if (!forecastData || !forecastData?.city || !forecastData?.list) {
            setTitle(`Could not find forecast data.`);
            setSubTitle(`Please try again.`);
            return;
        }

        setTitle(`${forecastData?.city?.name || ""} ${forecastData?.city?.country || ""}`);

        findInput.value = ``;

        let cityCoords = {
            lng: forecastData.city.coord.lon,
            lat: forecastData.city.coord.lat
        }

        map.flyTo({
            center: cityCoords,
            zoom: 10
        });

        let cityOffsetTimeHours = forecastData.city.timezone;

        for (let i = currentForecastIndex; i < forecastData.list.length; i += 8) {

            // for (let j = i; j < i + 8; j++) {
            //     console.log(forecastData.list[j].dt_txt);
            // }

            // console.log('---');
            // console.log(forecastData.list[i].dt_txt);
            // console.log(forecastData.list[i].weather[0].description);
            // console.log('---');

            let forecastItem = forecastData.list[i];
            let forecastItemElement = document.createElement("div");
            forecastItemElement.classList.add("forecast-item");
            forecastItemElement.classList.add("card");

            // forecastItemElement.title = forecastItem.weather[0].description + "\n\nTemperature:" + forecastItem.main.temp + "°F" + "\n\nFeels Like:" + forecastItem.main['feels_like'] + "°F";

            let forecastItemImg = document.createElement("img");
            forecastItemImg.classList.add("img-responsive");
            forecastItemImg.classList.add("card-img-top");
            forecastItemImg.src = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;

            let forecastItemBody = document.createElement("div");
            forecastItemBody.classList.add("card-body");

            let forecastItemDetail = document.createElement("div");
            forecastItemDetail.classList.add("card-detail");
            forecastItemDetail.innerText = forecastItem.weather[0].description;

            let minMaxContainer = document.createElement("div");
            minMaxContainer.classList.add("text-center");
            minMaxContainer.innerHTML = `<span>${forecastItem.main.temp_min + " °F"}</span> - ${forecastItem.main.temp_max + " °F"}</span>`;
            forecastItemBody.appendChild(minMaxContainer);

            // let forecastItemTemperatureMin = document.createElement("div");
            // forecastItemTemperatureMin.classList.add("card-temperature-min");
            // forecastItemTemperatureMin.innerText = forecastItem.main.temp_min + "°F";

            // let forecastItemTemperatureMax = document.createElement("div");
            // forecastItemTemperatureMax.classList.add("card-temperature-max");
            // forecastItemTemperatureMax.innerText = forecastItem.main.temp_max + "°F";

            let forecastItemHumidity = document.createElement("div");
            forecastItemHumidity.classList.add("text-center");
            forecastItemHumidity.innerText = "Humidity: " + forecastItem.main.humidity + "%";

            let speedAndDirection = document.createElement("div");

            let stringWind = `${forecastItem.wind.speed} mph (${forecastItem.wind.deg}°) ${degToCompass(forecastItem.wind.deg)}`;

            speedAndDirection.classList.add("text-center");
            speedAndDirection.innerHTML = `<span>${stringWind}</span>`;
            // speedAndDirection.innerHTML = `<span>${forecastItem.wind.speed + " mph"}</span> - ${forecastItem.wind.deg + "°"}`;
            forecastItemBody.appendChild(speedAndDirection);

            // let forecastItemWindSpeed = document.createElement("div");
            // forecastItemWindSpeed.classList.add("card-wind");
            // forecastItemWindSpeed.innerText = forecastItem.wind.speed + "mph";

            // let forecastItemWindDirection = document.createElement("div");
            // forecastItemWindDirection.classList.add("card-wind-direction");
            // forecastItemWindDirection.innerText = forecastItem.wind.deg + "°";

            let forecastItemPressure = document.createElement("div");
            forecastItemPressure.classList.add("text-center");
            forecastItemPressure.innerText = "Pressure: " + forecastItem.main.pressure + "hPa";

            let forecastItemTitle = document.createElement("h5");
            forecastItemTitle.classList.add("text-center");
            forecastItemTitle.innerText = convertTime(forecastItem.dt) + " " + new Date(forecastItem.dt_txt).toLocaleString();

            let forecastItemText = document.createElement("p");
            forecastItemText.classList.add("card-text");
            forecastItemText.innerText = forecastItem.weather[0].description;

            forecastItemBody.appendChild(forecastItemTitle);

            // let miscItem = document.createElement("div");
            // miscItem.classList.add("card-full-date-time");
            // miscItem.appendChild(document.createElement("hr"));
            //
            // forecastItemBody.appendChild(miscItem);

            forecastItemBody.appendChild(forecastItemHumidity);

            forecastItemBody.appendChild(forecastItemPressure);

            forecastItemBody.appendChild(forecastItemTitle);

            forecastItemElement.appendChild(forecastItemImg);

            forecastItemElement.appendChild(forecastItemBody);

            forecastContainer.appendChild(forecastItemElement);

        }

    }

    function getLiveForecastDataFromCurrentGpsLocation() {
        getForecastFromCurrentGpsPosition()
            .then((data) => {
                renderForecast(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLiveForecastDataFromGpsCoords(coords) {

        // setTitle(`${coords.lat}, ${coords.lng}`);

        getForecastFromSpecificGpsPosition(coords)
            .then((data) => {
                renderForecast(data);
                saveForecastData(data).then();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function getLiveForecastFromCity(city) {

        // setTitle(`${city}`);

        getForecastFromCity(city)
            .then((data) => {
                if (!data) {
                    setTitle(`Could not find forecast data.`);
                    setSubTitle(`Please try again.`);
                    return;
                }
                renderForecast(data);
                saveForecastData(data).then();

                let cityCoords = {
                    lng: data.city.coord.lon,
                    lat: data.city.coord.lat
                }

                let popupHTML = `<pre>${JSON.stringify(data.city, null, 2)}</pre>`;

                placeMarkerAndPopupUsingCoords(cityCoords, popupHTML, MAPBOX_TOKEN, map, true);

                map.flyTo({
                    center: cityCoords,
                    zoom: 10
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function saveForecastData(forecastData) {

        try {

            // Implementation of backend for saving a forecast JSON file

            let saveForecastResult = await saveForecast(forecastData, "", "");

            let id = saveForecastResult.data.id;

            if (saveForecastResult.data.statusCode === 201) {
                let testData = await getSavedForecast(id);
                console.log(testData);
                let savedForecastFileLink = `https://pasciak.com/weather_buddy/uploads/${saveForecastResult.data.file_uploaded}.json`;
                document.getElementById("uploaded").innerHTML = `<a target='_blank' href='${savedForecastFileLink}'>*</a>`;
            }

        } catch (error) {

            console.log(error);

            console.log("Error saving forecast data");

        }
    }

    function submitForm(event) {
        event.preventDefault();

        let city = findInput?.value?.trim() || "";

        if (!city) {
            let mHead = "ERROR"
            let mBody = `Please enter a city name.`;
            modal(mHead, mBody);
            return;
        }

        findInput.value = "";
        findInput.focus();

        getLiveForecastFromCity(city);

    }

    function modal(mhead, mbody, mform = document.getElementById("modal-form"), melement = null) {
        let modalHead = document.querySelector("#modalHead");
        let modalBody = document.querySelector("#modalBody");
        modalHead.innerText = mhead;
        modalBody.innerHTML = mbody;

        if (mform) {
            mform.innerHTML = "";
            if (melement) {
                mform.appendChild(melement);
            }
        }

        document.querySelector("#modal").classList.add("show");

        document.querySelector("#modal").style.display = "block";

        document.querySelector("#modalClose").addEventListener("click", (event) => {
            event.preventDefault();
            document.querySelector("#modal").classList.remove("show");
            document.querySelector('#modal').removeAttribute("style");
        }, {once: true});
    }

    function setTitle(title) {
        document.title = title;
        document.getElementById("title").innerText = title;
    }

    function setSubTitle(title) {
        document.getElementById("sub-title").innerText = title;
    }

    function init() {

        findForm = document.getElementById("form-find");
        findButton = document.getElementById("btn-find");
        homeButton = document.getElementById("btn-home");
        loadButton = document.getElementById('btn-load');
        findInput = document.getElementById("input-find");

        forecastRangeSlider = document.getElementById("forecast-range");

        forecastRangeSlider.addEventListener("change", (event) => {
            event.preventDefault();
            let value = event.target.value;
            currentForecastIndex = Number(value) || 0;
            renderForecast(forecastData);
        })

        findForm.addEventListener("submit", (event) => {
            event.preventDefault();
            setSubTitle("");
            submitForm(event);
        });

        findButton.addEventListener("click", (event) => {
            event.preventDefault();
            setTitle("Searching for your city.");
            setSubTitle("");
            submitForm(event);
        });

        loadButton.addEventListener("click", async (event) => {
            event.preventDefault();

            setTitle("Awaiting your load selection.");

            setSubTitle("");
            findInput.value = "";

            let data = await getSavedForecasts("", "");

            let forecasts = data.data.forecasts;

            if (!forecasts || forecasts.length === 0) {
                let mHead = "ERROR"
                let mBody = `No saved forecasts found.`;
                modal(mHead, mBody);
                return;
            }

            let form = document.createElement("div");
            form.id = "modal-form";

            let select = document.createElement("select");
            select.classList.add("form-control");
            select.classList.add("form-select");
            select.id = "select-load";
            select.name = "select-load";

            let option = document.createElement("option");
            option.value = "";
            option.text = "Choose One";
            option.selected = true;
            option.disabled = true;
            select.appendChild(option);

            forecasts.forEach((forecast) => {
                let option = document.createElement("option");
                option.value = forecast;
                option.text = forecast;
                select.appendChild(option);
            });

            select.addEventListener("change", async (event) => {
                event.preventDefault();
                let selected = event.target.value;

                forecastRangeSlider.value = 0; // start next results at first forecast
                currentForecastIndex = 0;

                try {
                    if (selected) {
                        selected = selected.replace(".json", "");
                    }
                } catch {
                    console.log("Error loading selected forecast", selected);
                }

                let loadedForecastResult = await getSavedForecast(selected);
                forecastData = loadedForecastResult.data;

                renderForecast(forecastData);

                closeModal();

                setTimeout(function () {
                    setSubTitle("Your forecast has been loaded.");

                }, 1500);


            });

            form.append(select);

            let mHead = "Load"
            let mBody = `Use the dropdown to load a saved forecast.`;

            let mForm = document.getElementById("modal-form");

            modal(mHead, mBody, mForm, form);

        });

        homeButton.addEventListener("click", (event) => {
            event.preventDefault();
            setTitle("Searching for your current GPS Location.");
            setSubTitle("");

            findInput.value = "";

            let mHead = "Getting Home Weather";

            let mBody = `
            <div class="modal-body text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            `;

            modal(mHead, mBody);

            getLiveForecastDataFromCurrentGpsLocation();

            setTimeout(function () {
                closeModal();
            }, 9000);


        });

    }

    function closeModal() {
        document.querySelector("#modalClose").click();
        findInput.focus();
    }

    init();

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
// todo: use the city detail in the forecast data to show as titles in the overall render, instead of numerous set title calls

})();