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
        let file = new Blob([JSON.stringify(forecastData)], {type: "application/json"});
        data.append("forecast", file);
        return await fetch("https://pasciak.com:8181/forecast", {
            method: "POST",
            body: data,
            // headers: {"Authorization": `Basic ${user}:${password}`}
        })
            .then((res) => res.json())
            .then((data) => {
                return {data: data, error: null};
            })
            .catch((error) => {
                return {data: null, error};
            });
    } catch (error) {
        return {data: null, error};
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
                return {data: data, error: null};
            })
            .catch((error) => {
                return {data: null, error};
            });
    } catch (error) {
        return {data: null, error};
    }
}

async function getSavedForecast(id) {
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
                return {data, error: null};
            })
            .catch((error) => {
                console.log(error);
                return {data: null, error};
            });
    } catch (error) {
        console.log(error);
        return {data: null, error};
    }
}

//  saveForecastData(data).then();

//  await getSavedForecast(id);

//  await getSavedForecasts("", "");

