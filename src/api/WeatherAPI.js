import React from 'react'
import axios from 'axios'

// we use there is arrow function cause we dont need to return html it writing with arrow is helped to write faster
// we use asynchronous functions its very important

const URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "5814002cd41aedcc0accef0bafda4907";

export const WeatherAPI = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',    // metric is just a celcius. If we dont use it we take the data on fahrenheit
            APPID: API_KEY, 
        }
    })

    return data;
}
