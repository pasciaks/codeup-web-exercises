"use strict";

(() => {

    let viewContainer = document.getElementById("view-container");
    let contentContainer = document.getElementById("content");

    let closeWindowButton = document.getElementById("close-window-button");
    closeWindowButton.addEventListener("click", () => {
        window.close();
    });

    let refreshButton = document.getElementById("refresh-window-button");
    refreshButton.addEventListener("click", () => {
        window.location.reload();
    });

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

    function setTitle(title) {
        let titleElement = document.getElementById("title");
        titleElement.innerText = title;
    }

    function renderForecast(forecastData) {

        viewContainer.innerHTML = "";

        if (!forecastData || !forecastData?.city || !forecastData?.list) {
            setTitle(`Could not find forecast data.`);
            contentContainer.style.display = "none";
            return;
        }

        setTitle(`${forecastData.city.name}, ${forecastData.city.country}`);

        let forecastHTML = "";

        for (let i = 0; i < forecastData.list.length; i += 1) {
            let eachDayItem = forecastData.list[i];
            let oneForecastItemElement = renderForecastCard(eachDayItem, "w-100");
            forecastHTML += oneForecastItemElement;
            viewContainer.innerHTML = forecastHTML;
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