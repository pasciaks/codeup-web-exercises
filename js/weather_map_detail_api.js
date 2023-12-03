"use strict";

(() => {

    let viewContainer = document.getElementById("view-container");
    let contentContainer = document.getElementById("content");

    let forecastData = [];

    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    function getFromLocalStorage(id) {
        try {
            let key = `dynamicallyAddedMapObjectsArray-${id}`;
            let data = localStorage.getItem(key);
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    function convertTime(epoch) {
        return new Date(epoch * 1000).toDateString();
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

    function setPageTitle(title) {
        document.title = title;
    }

    function setTitle(title) {
        let titleElement = document.getElementById("title");
        titleElement.innerText = title;
    }

    function setHeading(heading) {
        let headingElement = document.getElementById("heading");
        headingElement.innerText = heading;

    }

    function renderForecast(forecastData) {

        viewContainer.innerHTML = "";

        if (!forecastData || !forecastData?.city || !forecastData?.list) {
            setTitle(`Could not find forecast data.`);
            contentContainer.style.display = "none";
            return;
        }

        setTitle(`${forecastData.city.name}, ${forecastData.city.country}`);

        for (let i = 0; i < forecastData.list.length; i += 1) {
            let oneForecastItem = forecastData.list[i];
            let oneForecastItemElement = renderOneForecastItem(oneForecastItem);
            viewContainer.appendChild(oneForecastItemElement);
        }

    }

    function renderTemperatureChart(theForecast) {

        const ctx = document.getElementById('tempChart');

        let list = theForecast.list;

        const labels = list.map((item) => {
            return item.dt_txt;
        });

        let values = list.map((item) => {
            return item.main.temp;
        });

        let minValues = list.map((item) => {
            return item.main.temp_min;
        });

        let maxValues = list.map((item) => {
            return item.main.temp_max;
        });

        const data = {
            labels: labels,
            datasets: [{
                label: 'Temperature',
                data: values,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }, {
                label: 'Min',
                data: minValues,
                fill: false,
                borderColor: 'rgb(75, 92, 192)',
                tension: 0.1
            },
                {
                    label: 'Max',
                    data: maxValues,
                    fill: false,
                    borderColor: 'rgb(161,54,95)',
                    tension: 0.1
                }]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    function renderWindChart(theForecast) {

        const ctx = document.getElementById('windChart');

        let list = theForecast.list;

        const labels = list.map((item) => {
            return item.dt_txt;
        });

        const windValues = list.map((item) => {
            return item.wind.speed;
        });

        const data = {
            labels: labels,
            datasets: [{
                label: 'Wind Speed',
                data: windValues,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
            ]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }


    function displayForecast() {

        forecastData = getFromLocalStorage(getParameterByName("id"));

        renderForecast(forecastData || []);

        renderTemperatureChart(forecastData || []);

        renderWindChart(forecastData || []);
    }

    displayForecast();


})();