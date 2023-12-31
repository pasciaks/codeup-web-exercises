"use strict";

(() => {

    let findButton = null;
    let homeButton = null;
    let loadButton = null;
    let findInput = null;
    let findForm = null;
    let saveButton = null;

    let defaultZoom = 10;

    let animationArray = [];
    let animationTimer = null;
    let animateRotateInterval = 1000;
    let currentWeatherIconIndex = 0;
    let forecastAutoIntervalTimer = null;
    let forecastRotateInterval = 5000;
    let forecastRangeSlider = null;
    let currentForecastIndex = 0;

    let forecastData = {};

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
                    true,
                    forecastData);
                map.flyTo({
                    center: lngLat,
                    zoom: defaultZoom
                });

            }, 1000);

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
                let mHead = "ERROR"
                let mBody = `Please try again.`;
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
            .then(data => {
                let tempTitle = data?.features[0]?.place_name || "No results found";
                setSubTitle(tempTitle);
                return tempTitle;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
    }

    function placeMarkerAndPopupUsingCoords(coords, popupHTML, token, map, draggable = false, theForecastData) {
        let id = Date.now() + Math.floor(Math.random() * 99999);
        localStorage.setItem(`dynamicallyAddedMapObjectsArray-${id}`, JSON.stringify(theForecastData));
        popupHTML += `<div id="data"><a target="_blank" href="weather_map_detail.html?id=${id}">Details:${id}</a></div>`;
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

                popup.setHTML('searching...');

                setTimeout(function () {
                    popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});
                    popup.setHTML(popupHTML);
                    popup.addTo(map);

                    dynamicallyAddedMapObjectsArray.find((item) => {
                        if (item.id === id) {
                            item.popup = popup;
                            item.marker = marker;
                            item.forecastData = forecastData;
                            popupHTML += `<div id="data"><a target="_blank" href="weather_map_detail.html?id=${id}">Details:${id}</a></div>`;
                            popup.setHTML(popupHTML);
                            localStorage.setItem(`dynamicallyAddedMapObjectsArray-${id}`, JSON.stringify(forecastData));
                        }
                    });

                }, 1000);

            }

            marker.on('dragend', onDragEnd);
        }

        dynamicallyAddedMapObjectsArray.push({id, popup, marker, forecastData});

        recordSavedForecast(id);

        popup.addTo(map);

        return id;
    }

    function recordSavedForecast(id, theForecastData) {
        try {

            let currentStorage = localStorage.getItem("savedForecasts");
            let savedForecasts = [];

            if (currentStorage) {
                savedForecasts = JSON.parse(currentStorage);
            }

            savedForecasts.push(id);

            if (!theForecastData || !theForecastData?.city || !theForecastData?.list) {
                theForecastData = forecastData; // Rely on latest global forecastData
            }

            localStorage.setItem(`dynamicallyAddedMapObjectsArray-${id}`, JSON.stringify(theForecastData));

            localStorage.setItem("savedForecasts", JSON.stringify(savedForecasts));

        } catch (error) {

            console.log(error);

        }
    }

    function convertTime(epoch) {
        return new Date(epoch * 1000).toDateString();
    }

    function forecastByCoords(lat, lon) {

        forecastRangeSlider.value = 0;
        currentForecastIndex = 0;
        currentWeatherIconIndex = 0;

        return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(data => {
                if (data?.cod !== "200") {
                    let mHead = "ERROR"
                    let mBody = `We could not find any forecast data for the search criteria you entered. Please try again.`;
                    modal(mHead, mBody);
                }
                return data;
            })
            .catch((error) => {
                console.error(error);
                let mHead = "ERROR"
                let mBody = `We could not find any forecast data for the search criteria you entered. Please try again.`;
                modal(mHead, mBody);
                return null;
            });
    }

    function forecastByCity(city) {

        forecastRangeSlider.value = 0;
        currentForecastIndex = 0;
        currentWeatherIconIndex = 0;

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
                let mBody = `We could not find any forecast data for the search criteria you entered. Please try again.`;
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
                return [];
            })

        return forecastData;
    }

    function renderOneForecastItem(forecastItem, index) {

        let forecastItemElement = document.createElement("div");
        forecastItemElement.innerHTML = renderForecastCard(forecastItem, "m-2");

        forecastItemElement.addEventListener("click", (event) => {
            event.preventDefault();

            let currentSelectedForecast = localStorage.getItem("currentForecastRecord");

            if (currentSelectedForecast) {
                let data = JSON.parse(currentSelectedForecast);
                if (data) {
                    let dayHTML = '';
                    for (let jj = index; jj < index + 8; jj++) {
                        let eachDayItem = data.list[jj];
                        dayHTML += renderForecastCard(eachDayItem, "w-25");
                    }
                    let containerHTML = `
                    <div class="container-fluid">
                        <div class="flex-wrap align-baseline justify-around justify-center row">
                            ${dayHTML}
                        </div>  
                    </div>
                    `;
                    modal("Forecast", containerHTML);
                }
            }
        });

        return forecastItemElement;
    }

    function showForecastSliderControl(show = true) {
        if (show) {
            document.getElementById("forecast-slider-container").classList.remove("d-none");
        } else {
            document.getElementById("forecast-slider-container").classList.add("d-none");
        }
    }

    function renderForecast(forecastData) {

        forecastContainer.innerHTML = "";

        if (!forecastData || !forecastData?.city || !forecastData?.list) {
            setTitle(`Could not find forecast data.`);
            setSubTitle(`Please try again.`);
            return;
        }

        showForecastSliderControl(forecastData.list.length > 0);

        setTitle(`${forecastData?.city?.name || ""} ${forecastData?.city?.country || ""}`);

        localStorage.setItem("currentForecastRecord", JSON.stringify(forecastData));

        for (let i = currentForecastIndex; i < forecastData.list.length; i += 8) {
            let oneForecastItem = forecastData.list[i];
            let oneForecastItemElement = renderOneForecastItem(oneForecastItem, i - currentForecastIndex);
            forecastContainer.appendChild(oneForecastItemElement);
        }

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

                placeMarkerAndPopupUsingCoords(cityCoords, popupHTML, MAPBOX_TOKEN, map, true, forecastData);

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

            let saveForecastResult = await saveForecast(forecastData);

            if (!saveForecastResult.data) {
                console.log("Error saving forecast data");
                return;
            }

            let id = saveForecastResult.data.file_uploaded;

            if (saveForecastResult.data.statusCode === 201) {
                let savedForecastFileLink = `https://pasciak.com/weather_buddy/uploads/${id}.json`;
                document.getElementById("uploadedJson").innerHTML = `<a href='${savedForecastFileLink}'>*</a>`;
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
            let mBody = `Please enter somewhere to search for.. Example: "San Antonio"`;
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
        saveButton = document.getElementById("btn-save");

        forecastRangeSlider = document.getElementById("forecast-range");

        forecastRangeSlider.addEventListener("change", (event) => {
            event.preventDefault();
            let value = event.target.value;
            currentForecastIndex = Number(value) || 0;
            renderForecast(forecastData);

            if (forecastAutoIntervalTimer) {
                clearInterval(forecastAutoIntervalTimer);
            }

            forecastAutoIntervalTimer = setInterval(function () {
                currentForecastIndex += 1;
                if (currentForecastIndex > 7) {
                    currentForecastIndex = 0;
                }
                forecastRangeSlider.value = currentForecastIndex;
                renderForecast(forecastData);
            }, forecastRotateInterval);
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

                currentWeatherIconIndex = 0;

                let lngLat = {
                    lng: forecastData.city.coord.lon,
                    lat: forecastData.city.coord.lat
                }

                let popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});

                placeMarkerAndPopupUsingCoords(lngLat, popupHTML, MAPBOX_TOKEN, map, true, forecastData);

                map.flyTo({
                    center: lngLat,
                    zoom: defaultZoom
                });

                // recordSavedForecast(selected, forecastData);

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

        saveButton.addEventListener("click", async (event) => {
            event.preventDefault();

            if (!forecastData || !forecastData?.city || !forecastData?.list) {
                let mHead = "ERROR"
                let mBody = `No forecast data to save.`;
                modal(mHead, mBody);
                return;
            }

            setTitle("Saving your forecast.");

            setSubTitle("");

            findInput.value = "";

            let mHead = "Saving"
            let mBody = `
            <div class="modal-body text-center">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            `;

            modal(mHead, mBody);

            try {
                let saveDataResult = await saveDataToBackend(forecastData);
                console.log({saveDataResult});
                window.open("https://public.requestbin.com/r/en9lq7dy4nwcl/");
            } catch (error) {
                console.log(error);
            }

            setTimeout(function () {
                closeModal();
            }, 9000);
        });

        homeButton.addEventListener("click", async (event) => {

            event.preventDefault();

            clearPopups();

            console.log("Note this feature clears any local map markers and popups.")

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


            await getLiveForecastDataFromCurrentGpsLocation();

            setTimeout(function () {
                closeModal();

                console.log("Note, this feature will add a marker and popup to the map.");
                let lngLat = {
                    lng: forecastData.city.coord.lon,
                    lat: forecastData.city.coord.lat
                }
                let popupHTML = renderCityDataForHtmlPopup(forecastData?.city || {});
                placeMarkerAndPopupUsingCoords(lngLat, popupHTML, MAPBOX_TOKEN, map, true, forecastData);

            }, 9000);

        });

    }

    function createAnimations() {

        animationArray = [];

        for (let i = 0; i < forecastData.list.length; i++) {

            let forecastItem = forecastData.list[i];
            let forecastItemElement = document.createElement("div");
            forecastItemElement.classList.add("forecast-item");
            forecastItemElement.classList.add("text-center");
            forecastItemElement.style.display = "none";

            let forecastItemData = document.createElement("div");
            let forecastItemTime = new Date(forecastItem.dt * 1000);
            forecastItemData.innerText = forecastItemTime.toLocaleString();

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

            currentWeatherIconIndex++;

        }, animateRotateInterval);
    }

    function closeModal() {
        document.querySelector("#modalClose").click();
        findInput.focus();
    }

    init();

    // todo: different icon based on the weather , temp, etc...
    // todo - load and plot route data, see data/route_data.js
    // todo - get all forecasts along the route
    // todo - update stored library file and share with class so all their forecasts can be captured
    // todo - table view of data

})();