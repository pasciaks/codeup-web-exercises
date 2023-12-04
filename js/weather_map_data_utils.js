/*
    MIT License

    Copyright (c) [2023] [Sheldon Pasciak]

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */

"use strict";

/**
 * saveForecast
 * @param forecastData
 * @param user
 * @param password
 * @returns {Promise<{data: null, error}|{data: *, error: null}|{data: null, error: *}>}
 */
async function saveForecast(forecastData, user = "", password = "") {
    try {
        let data = new FormData();
        let file = new Blob([JSON.stringify(forecastData)], { type: "application/json" });
        data.append("forecast", file);
        return await fetch("https://pasciak.com:8181/forecast", {
            method: "POST",
            body: data,
            // headers: {"Authorization": `Basic ${user}:${password}`}
        })
            .then((res) => res.json())
            .then((data) => {
                return { data: data, error: null };
            })
            .catch((error) => {
                return { data: null, error };
            });
    } catch (error) {
        return { data: null, error };
    }
}

/**
 * getSavedForecasts
 * @param user
 * @param password
 * @returns {Promise<{data: null, error}|{data: *, error: null}|{data: null, error: *}>}
 */
async function getSavedForecasts(user = "", password = "") {
    try {
        return await fetch('https://pasciak.com:8181/forecast', {
            method: 'GET',
            // headers: {"Authorization": `Basic ${user}:${password}`}
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return { data: data, error: null };
            })
            .catch((error) => {
                return { data: null, error };
            });
    } catch (error) {
        return { data: null, error };
    }
}

async function getSavedForecast(id = "") {
    try {
        return await fetch(`https://pasciak.com:8181/id?id=${id}`, {
            method: 'GET',
            // headers: {"Authorization": `Basic ${user}:${password}`}
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                return { data, error: null };
            })
            .catch((error) => {
                console.log(error);
                return { data: null, error };
            });
    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
}

async function sendDataRowsToDB(forecastData) {
    const jsonData = forecastData;

    const listItems = jsonData.list;

    listItems.forEach(async item => {
        // Construct FormData object
        const formData = new FormData();

        // Append each field to the FormData object
        formData.append('cod', jsonData.cod);
        formData.append('message', jsonData.message);
        formData.append('cnt', jsonData.cnt);
        formData.append('city_id', jsonData.city.id);
        formData.append('city_name', jsonData.city.name);
        formData.append('city_lat', jsonData.city.coord.lat);
        formData.append('city_lon', jsonData.city.coord.lon);
        formData.append('city_country', jsonData.city.country);
        formData.append('city_population', jsonData.city.population);
        formData.append('city_timezone', jsonData.city.timezone);
        formData.append('city_sunrise', jsonData.city.sunrise);
        formData.append('city_sunset', jsonData.city.sunset);

        formData.append('list_dt', item.dt);
        formData.append('list_temp', item.main.temp);
        formData.append('list_feels_like', item.main.feels_like);
        formData.append('list_temp_min', item.main.temp_min);
        formData.append('list_temp_max', item.main.temp_max);
        formData.append('list_pressure', item.main.pressure);
        formData.append('list_sea_level', item.main.sea_level);
        formData.append('list_grnd_level', item.main.grnd_level);
        formData.append('list_humidity', item.main.humidity);
        formData.append('list_temp_kf', item.main.temp_kf);

        formData.append('list_weather_id', item.weather[0].id);
        formData.append('list_weather_main', item.weather[0].main);
        formData.append('list_weather_description', item.weather[0].description);
        formData.append('list_weather_icon', item.weather[0].icon);

        formData.append('list_clouds_all', item.clouds.all);
        formData.append('list_wind_speed', item.wind.speed);
        formData.append('list_wind_deg', item.wind.deg);
        formData.append('list_wind_gust', item.wind.gust);
        formData.append('list_visibility', item.visibility);
        formData.append('list_pop', item.pop);
        formData.append('list_snow_3h', item.snow ? item.snow['3h'] : null);
        formData.append('list_sys_pod', item.sys.pod);
        formData.append('list_dt_txt', item.dt_txt);

        // Make a POST request using Fetch API
        await fetch('https://pasciak.com:8181/weather_data', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Data posted successfully:', data);
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });
    });

}

// let data = await saveForecast(forecastData);
// let id = data.data.id;

// let data = await getSavedForecast(id);
// console.log(data);

// let data = await getSavedForecasts();
// let forecasts = data.data.forecasts;

