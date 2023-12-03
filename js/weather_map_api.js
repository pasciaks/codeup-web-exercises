"use strict";

(() => {

    let findButton = null;
    let homeButton = null;
    let loadButton = null;
    let findInput = null;
    let findForm = null;

    let defaultZoom = 10;

    let animationArray = [];
    let animationTimer = null;
    let currentWeatherIconIndex = 0;

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

            setTimeout(function () {
                let popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});

                placeMarkerAndPopupUsingCoords(
                    lngLat,
                    popupHTML,
                    MAPBOX_TOKEN,
                    map,
                    true);
                map.flyTo({
                    center: lngLat,
                    zoom: defaultZoom
                });
            }, 1000);

            // let popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});
            //
            // // @todo - adjust this to show the popup with generated info
            // let address = await reverseGeocode(lngLat, MAPBOX_TOKEN);
            //
            // placeMarkerAndPopupUsingCoords(
            //     lngLat,
            //     popupHTML,
            //     MAPBOX_TOKEN,
            //     map,
            //     true);
            // map.flyTo({
            //     center: lngLat,
            //     zoom: 10
            // });


        });
    });


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
                let mBody = ``;
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
                // reverseGeocode(lngLat, MAPBOX_TOKEN)
                //     .then(async (address) => {

                //@todo - adjust this to show the popup with generated info

                // popupHTML = `<div>${address}</div>`;
                popup.setHTML('searching...');
                setTimeout(function () {
                    popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});
                    popup.setHTML(popupHTML);
                    popup.addTo(map);
                }, 1000);

                // })
                // .catch((error) => {
                //     console.error('Error:', error);
                // });
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
                let mBody = ``;
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
                let mBody = ``;
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

        // saveForecastData(forecastData).then();

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
            zoom: defaultZoom
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

    function renderOneForecastItem(forecastItem) {
        let forecastItemElement = document.createElement("div");
        forecastItemElement.classList.add("forecast-item");
        forecastItemElement.classList.add("card");
        let forecastItemImg = document.createElement("img");
        forecastItemImg.classList.add("card-img-top");
        forecastItemImg.src = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;
        let forecastItemBody = document.createElement("div");
        forecastItemBody.classList.add("card-body");
        let forecastItemDetail = document.createElement("div");
        forecastItemDetail.classList.add("card-detail");
        forecastItemDetail.innerText = forecastItem.weather[0].description;

        let temperature = forecastItem.main.temp;
        let temperatureColor = "black";
        if (temperature < 32) {
            temperatureColor = "blue";
        }
        if (temperature > 80) {
            temperatureColor = "red";
        }

        let minMaxContainer = document.createElement("div");
        minMaxContainer.classList.add("text-center");
        minMaxContainer.innerHTML = `<span>${forecastItem.main.temp_min + " °F"}</span> - ${forecastItem.main.temp_max + " °F"}</span>`;
        minMaxContainer.style.color = temperatureColor;


        forecastItemBody.appendChild(minMaxContainer);

        let forecastItemHumidity = document.createElement("div");
        forecastItemHumidity.classList.add("text-center");
        forecastItemHumidity.innerText = "Humidity: " + forecastItem.main.humidity + "%";
        let speedAndDirection = document.createElement("div");
        let stringWind = `${forecastItem.wind.speed} mph (${forecastItem.wind.deg}°) ${degToCompass(forecastItem.wind.deg)}`;
        speedAndDirection.classList.add("text-center");
        speedAndDirection.innerHTML = `<span>${stringWind}</span>`;
        forecastItemBody.appendChild(speedAndDirection);
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
        forecastItemBody.appendChild(forecastItemHumidity);
        forecastItemBody.appendChild(forecastItemPressure);
        forecastItemBody.appendChild(forecastItemTitle);
        forecastItemElement.appendChild(forecastItemImg);
        forecastItemElement.appendChild(forecastItemBody);
        return forecastItemElement;
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

        if (!forecastData || !forecastData?.city || !forecastData?.list) {
            setTitle(`Could not find forecast data.`);
            setSubTitle(`Please try again.`);
            return;
        }

        setTitle(`${forecastData?.city?.name || ""} ${forecastData?.city?.country || ""}`);

        // let cityCoords = {
        //     lng: forecastData.city.coord.lon,
        //     lat: forecastData.city.coord.lat
        // }
        //
        // map.flyTo({
        //     center: cityCoords,
        //     zoom: 10
        // });

        for (let i = currentForecastIndex; i < forecastData.list.length; i += 8) {
            let oneForecastItem = forecastData.list[i];
            let oneForecastItemElement = renderOneForecastItem(oneForecastItem);
            forecastContainer.appendChild(oneForecastItemElement);
        }

        // for (let i = currentForecastIndex; i < forecastData.list.length; i += 8) {
        //     let forecastItem = forecastData.list[i];
        //     let forecastItemElement = document.createElement("div");
        //     forecastItemElement.classList.add("forecast-item");
        //     forecastItemElement.classList.add("card");
        //     let forecastItemImg = document.createElement("img");
        //     forecastItemImg.classList.add("img-responsive");
        //     forecastItemImg.classList.add("card-img-top");
        //     forecastItemImg.src = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;
        //     let forecastItemBody = document.createElement("div");
        //     forecastItemBody.classList.add("card-body");
        //     let forecastItemDetail = document.createElement("div");
        //     forecastItemDetail.classList.add("card-detail");
        //     forecastItemDetail.innerText = forecastItem.weather[0].description;
        //     let minMaxContainer = document.createElement("div");
        //     minMaxContainer.classList.add("text-center");
        //     minMaxContainer.innerHTML = `<span>${forecastItem.main.temp_min + " °F"}</span> - ${forecastItem.main.temp_max + " °F"}</span>`;
        //     forecastItemBody.appendChild(minMaxContainer);
        //     let forecastItemHumidity = document.createElement("div");
        //     forecastItemHumidity.classList.add("text-center");
        //     forecastItemHumidity.innerText = "Humidity: " + forecastItem.main.humidity + "%";
        //     let speedAndDirection = document.createElement("div");
        //     let stringWind = `${forecastItem.wind.speed} mph (${forecastItem.wind.deg}°) ${degToCompass(forecastItem.wind.deg)}`;
        //     speedAndDirection.classList.add("text-center");
        //     speedAndDirection.innerHTML = `<span>${stringWind}</span>`;
        //     forecastItemBody.appendChild(speedAndDirection);
        //     let forecastItemPressure = document.createElement("div");
        //     forecastItemPressure.classList.add("text-center");
        //     forecastItemPressure.innerText = "Pressure: " + forecastItem.main.pressure + "hPa";
        //     let forecastItemTitle = document.createElement("h5");
        //     forecastItemTitle.classList.add("text-center");
        //     forecastItemTitle.innerText = convertTime(forecastItem.dt) + " " + new Date(forecastItem.dt_txt).toLocaleString();
        //     let forecastItemText = document.createElement("p");
        //     forecastItemText.classList.add("card-text");
        //     forecastItemText.innerText = forecastItem.weather[0].description;
        //     forecastItemBody.appendChild(forecastItemTitle);
        //     forecastItemBody.appendChild(forecastItemHumidity);
        //     forecastItemBody.appendChild(forecastItemPressure);
        //     forecastItemBody.appendChild(forecastItemTitle);
        //     forecastItemElement.appendChild(forecastItemImg);
        //     forecastItemElement.appendChild(forecastItemBody);
        //
        //     forecastContainer.appendChild(forecastItemElement);
        // }

    }

    function getLiveForecastDataFromCurrentGpsLocation() {
        getForecastFromCurrentGpsPosition()
            .then((data) => {
                renderForecast(data);
                saveForecastData(data).then();
                createAnimations();
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
                createAnimations();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * In this function, /\B(?=(\d{3})+(?!\d))/g is a regular expression that matches
     * every third digit from the end of the number and inserts a comma before it.
     * The replace method is then used to replace those occurrences with commas.
     *
     * @param number
     * @returns {string}
     */
    function formatNumberWithCommas(number) {
        return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function convertEpochToUtcAndLocal(epoch) {

        // Convert epoch to milliseconds (JavaScript uses milliseconds for timestamps)
        const timestamp = epoch * 1000;

        // Create a Date object using the timestamp
        const dateTime = new Date(timestamp);

        console.log("Epoch Time:", dateTime.toUTCString());
        console.log("Local Time:", dateTime.toLocaleString());

        return {utc: dateTime.toUTCString(), local: dateTime.toLocaleString()};
    }

    function renderCityDataForHtmlPopup(cityData) {
        let popupHTML = `
            <div class="text-center">
                <h5>${cityData?.name || "Unknown!"} ${cityData?.country || ""}</h5>
                <p><i class="bi bi-people"></i> ${formatNumberWithCommas(cityData.population)}</p>
                <p><i class="bi bi-sun"></i> ${convertEpochToUtcAndLocal(cityData.sunrise).local}</p>
                <p><i class="bi bi-moon"></i> ${convertEpochToUtcAndLocal(cityData.sunset).local}</p>
            </div>
        `;
        return popupHTML;
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
                createAnimations();

                let cityCoords = {
                    lng: data.city.coord.lon,
                    lat: data.city.coord.lat
                }

                let popupHTML = renderCityDataForHtmlPopup(data?.city || {});

                placeMarkerAndPopupUsingCoords(cityCoords, popupHTML, MAPBOX_TOKEN, map, true);

                map.flyTo({
                    center: cityCoords,
                    zoom: defaultZoom
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    async function saveForecastData(forecastData) {

        try {

            // Implementation of backend for saving a forecast JSON file

            let saveForecastResult = await saveForecast(forecastData);

            let id = saveForecastResult.data.id;

            if (saveForecastResult.data.statusCode === 201) {
                // let testData = await getSavedForecast(id);
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

    function clearPopups() {
        dynamicallyAddedMapObjectsArray.forEach((item) => {
            item.marker.remove();
            item.popup.remove();
        });
        dynamicallyAddedMapObjectsArray = [];
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
        });

        forecastRangeSlider.addEventListener("focus", (event) => {
            event.preventDefault();
            if (forecastAutoIntervalTimer) {
                clearInterval(forecastAutoIntervalTimer);
            }
            let value = event.target.value;
            currentForecastIndex = Number(value) || 0;
            currentWeatherIconIndex = currentForecastIndex;
        });

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

            let data = await getSavedForecasts();

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

                let cityCoords = {
                    lng: forecastData.city.coord.lon,
                    lat: forecastData.city.coord.lat
                }

                map.flyTo({
                    center: cityCoords,
                    zoom: defaultZoom
                });

                createAnimations();

                closeModal();


            });

            form.append(select);

            let mHead = "Load"
            let mBody = `Use the dropdown to load a saved forecast.`;

            let mForm = document.getElementById("modal-form");

            modal(mHead, mBody, mForm, form);

        });

        homeButton.addEventListener("click", (event) => {

            event.preventDefault();

            clearPopups();

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

    function createAnimations() {

        // animation of weather icons
        animationArray = [];
        for (let i = 0; i < forecastData.list.length; i++) {
            let forecastItem = forecastData.list[i];
            let forecastItemElement = document.createElement("div");
            forecastItemElement.classList.add("forecast-item");
            forecastItemElement.style.display = "none";

            let forecastItemData = document.createElement("div");
            forecastItemData.innerText = forecastItem["dt_txt"];

            let temperature = forecastItem.main.temp;

            let forecastItemTempElement = document.createElement("div");
            forecastItemTempElement.innerText = `${temperature} °F`;

            let temperatureColor = "black";
            if (temperature < 32) {
                temperatureColor = "blue";
            }
            if (temperature > 80) {
                temperatureColor = "red";
            }
            forecastItemTempElement.style.color = temperatureColor;

            let forecastItemImg = document.createElement("img");
            forecastItemImg.classList.add("img-responsive");
            forecastItemImg.classList.add("card-img-top");
            forecastItemImg.alt = forecastData.list[i].weather[0].description;
            forecastItemImg.title = new Date(forecastData.list[i].dt);
            forecastItemImg.src = `https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`;

            forecastItemElement.appendChild(forecastItemTempElement);
            forecastItemElement.appendChild(forecastItemData);
            forecastItemElement.appendChild(forecastItemImg);
            animationArray.push(forecastItemElement);
        }

        document.getElementById("animationImages").innerHTML = "";
        animationArray.forEach((element) => {
            element.style.display = "none";
            document.getElementById("animationImages").appendChild(element);
        });

        if (animationTimer) {
            clearInterval(animationTimer);
        }
        startAnimations();

    }

    function startAnimations() {
        animationTimer = setInterval(function () {
            currentWeatherIconIndex++;
            if (currentWeatherIconIndex >= animationArray.length) {
                currentWeatherIconIndex = 0;
            }
            for (let i = 0; i < animationArray.length; i++) {
                if (currentWeatherIconIndex === i) {
                    animationArray[i].style.display = "block";
                } else {
                    animationArray[i].style.display = "none";
                }
            }
        }, 1000);
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
// todo - load and plot route data, see data/route_data.js
// todo - from route points, poll the collection of the weather forecast for all those locations
// todo - have the icons of all points in the route animate in a loop
// todo - use custom marker for temp, wind direction, etc
// todo - store the loaded data in an object of the remembered locations ( dynamicallyAddedMapObjectsArray
// todo - hen when they click on the remembered location, it will load the data from the object and ask if it
// todo - needs to be updated with a fresh api call
// todo - update stored library file and share with class so all their forecasts can be captured
// todo - graph hourly temperatures for the 40 elements, use chart js

})();