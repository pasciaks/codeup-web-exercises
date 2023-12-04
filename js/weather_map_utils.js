function renderForecastCard(eachDayItem, cardClass = "") {
    let eachDayDateTime = new Date(eachDayItem.dt * 1000);
    let eachDayTheWordNameOfTheWeek = eachDayDateTime.toLocaleString('default', {weekday: 'long'});
    let displayDateTime = `<p>${eachDayDateTime.toLocaleString()}</p>`;
    let temperature = Number(eachDayItem.main.temp);
    let temperatureClass = getTemperatureClassFromValue(temperature);

    return `
                <div class="card ${cardClass}">
                    <div class="text-center">
                    <h4>${eachDayTheWordNameOfTheWeek}</h4>
                    <h5>${displayDateTime}</h5>
                    <img src="https://openweathermap.org/img/wn/${eachDayItem.weather[0].icon}.png" alt="${eachDayItem.weather[0].description}">
                    <p class="">${eachDayItem.weather[0].description}</p>
                    <p class="${temperatureClass}">${eachDayItem.main.temp_min} °F - <span class="${temperatureClass}">(${eachDayItem.main.temp} °F)</span> - ${eachDayItem.main.temp_max} °F</p>
                    <p class="">${eachDayItem.main.humidity} % (${eachDayItem.main.pressure} hPa)</p>
                    <p class="">${eachDayItem.wind.speed} mph (${degToCompass(eachDayItem.wind.deg)})</p>
                    </div>
                </div>
                `;
}

function degToCompass(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function getTemperatureClassFromValue(temperature) {
    let temperatureClass = "normal";
    if (temperature <= 33) {
        temperatureClass = "cold";
    }
    if (temperature >= 80) {
        temperatureClass = "hot";
    }
    return temperatureClass;
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

function computeAverage(array) {
    let sum = 0;
    array.forEach((item) => {
        sum += item;
    });
    return (sum / array.length);
}


