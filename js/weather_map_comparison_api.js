"use strict";

(() => {

    let clearButton = document.getElementById("clear-button");

    clearButton.addEventListener("click", () => {
        localStorage.clear();
        location = 'weather_map.html';
    });

    let homeButton = document.getElementById("home-button");

    homeButton.addEventListener("click", () => {
        location = 'weather_map.html';

    });

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

    function getStoredData() {
        let currentStorage = localStorage.getItem("savedForecasts");
        let savedForecasts = [];
        if (currentStorage) {
            savedForecasts = JSON.parse(currentStorage);
        }
        let allForecasts = [];
        savedForecasts.forEach((item) => {
            let oneForecast = getFromLocalStorage(item);
            allForecasts.push(oneForecast);
        });
        return allForecasts;
    }

    function getRandomColorByType(colorType) {
        // Define the minimum and maximum values for the color components (0 to 255)
        const minComponent = 125;
        const maxComponent = 255;

        // Generate a random component value
        const generateComponent = () => Math.floor(Math.random() * (maxComponent - minComponent + 1)) + minComponent;

        let red, green, blue;

        switch (colorType.toUpperCase()) {
            case 'RED':
                red = generateComponent();
                green = 0;
                blue = 0;
                break;
            case 'GREEN':
                red = 0;
                green = generateComponent();
                blue = 0;
                break;
            case 'BLUE':
                red = 0;
                green = 0;
                blue = generateComponent();
                break;
            default:
                throw new Error('Invalid color type. Please use "RED", "GREEN", or "BLUE".');
        }

        // Return the RGB color as an HTML string
        return `rgb(${red}, ${green}, ${blue})`;
    }

    function renderTemperatureChart(theForecast) {

        let allForecasts = getStoredData();

        const ctx = document.getElementById('tempChart');

        let chartDataObject = {};

        for (let forecast of allForecasts) {
            let list = forecast.list;

            list.forEach((item) => {
                if (!chartDataObject[forecast.city.name]) {
                    chartDataObject[forecast.city.name] = {};
                }
                if (!chartDataObject[forecast.city.name][item.dt_txt]) {
                    chartDataObject[forecast.city.name][item.dt_txt] = {};
                }
            });

            list.forEach((item) => {
                chartDataObject[forecast.city.name][item.dt_txt] = item.main.temp;
            });

        }

        let labels = [];

        let datasets = [];

        let arrayOfCities = Object.keys(chartDataObject);

        arrayOfCities.forEach((city) => {
            let arrayOfDates = Object.keys(chartDataObject[city]);
            arrayOfDates.forEach((date) => {
                if (!labels.includes(date)) {
                    labels.push(date);
                }
            });
        });

        for (let forecast of allForecasts) {
            let list = forecast.list;

            list.forEach((item) => {
                if (!chartDataObject[forecast.city.name]) {
                    chartDataObject[forecast.city.name] = {};
                }
                if (!chartDataObject[forecast.city.name][item.dt_txt]) {
                    chartDataObject[forecast.city.name][item.dt_txt] = 0;
                }
            });

            list.forEach((item) => {
                chartDataObject[forecast.city.name][item.dt_txt] = item.main.temp;
            });
        }

        function computeAverage(array) {
            let sum = 0;
            array.forEach((item) => {
                sum += item;
            });
            return (sum / array.length);
        }

        arrayOfCities.forEach((city) => {

            let data = [];

            let cityObject = Object(chartDataObject[city]);

            let arrayOfDates = Object.keys(cityObject);
            arrayOfDates.forEach((dt_txt) => {
                data.push(chartDataObject[city][dt_txt]);
            });

            let average = Number(computeAverage(data));

            let oneDataSet = {
                label: city,
                data: data,
                fill: false,
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
                tension: 0.1
            };

            switch (average) {
                case average < 33:
                    oneDataSet.backgroundColor = getRandomColorByType('BLUE');
                    oneDataSet.borderColor = getRandomColorByType('BLUE');
                    break;
                case average >= 33 && average < 66:
                    oneDataSet.backgroundColor = getRandomColorByType('GREEN');
                    oneDataSet.borderColor = getRandomColorByType('GREEN');
                    break;
                case average >= 66:
                    oneDataSet.backgroundColor = getRandomColorByType('RED');
                    oneDataSet.borderColor = getRandomColorByType('GREEN');
                    break;
            }

            datasets.push({...oneDataSet});
        });

        const data = {
            labels,
            datasets
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    colors: {
                        enabled: true,
                        forceOverride: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    renderTemperatureChart();

})();