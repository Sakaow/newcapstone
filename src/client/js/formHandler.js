import moment from 'moment';
import { validateDate } from './validateDate';


// store data
const travelData = {};
// reference save form element
const saveTripBtn = document.querySelector('#saveBtn');

// API keys
const wApiKey = process.env.API_KEY_WEATHERBIT;
const pApiKey = process.env.API_PIXABAY;
const geoname = process.env.API_GEONAMES;

// URLs
// fetch city name from geonames
const geonameURL = 'http://api.geonames.org/searchJSON';
// using geonames's city name, fetch weather data from weatherbit
const wURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
// using geonames's city name, fetch image from pixabay
const pURL = 'https://pixabay.com/api/';


// add event listener to save button
saveTripBtn.addEventListener('click', tripWeatherAndImage);

export async function tripWeatherAndImage(e) {
    e.preventDefault();
    // get form data
    let destination = document.querySelector('#destination').value;
    let startDate = document.querySelector('#startDate').value;
    let endDate = document.querySelector('#endDate').value;

    let error = document.querySelector('#error');
    let errorMsg = document.querySelector('.error-message');
    // validate form data
    if (destination === '' || startDate === '' || endDate === '') {
        
        return error.innerHTML = 'Please fill out all fields';
    } else if (startDate > endDate) {
        
        return errorMsg.innerHTML = 'Start date must be before end date';
    }

    // format dates
    startDate = moment(startDate).format('YYYY-MM-DD');
    endDate = moment(endDate).format('YYYY-MM-DD');

    // Client is a library to store data to webpack config file
    // Client.validateDate(startDate, endDate);
    validateDate(startDate, endDate);
    // store form data in object
    travelData.destination = destination;
    travelData.startDate = startDate;
    travelData.endDate = endDate;

    await cityNameFromGeo(destination);
    await weatherData(travelData.lat, travelData.lon, travelData.countryCode, travelData.cityName);
    await postData(travelData);
    await imageData(travelData.cityName);

}
    

    // fetch city name from geonames and store lat, lon, country code, and city name
    const cityNameFromGeo = async function (destination) {
        const response = await fetch(`${geonameURL}?q=${destination}&maxRows=10&username=${geoname}`)
        const data = await response.json();
        const lat = Math.floor(data.geonames[0].lat);
        const lon = Math.floor(data.geonames[0].lng);
        const countryCode = data.geonames[0].countryCode;
        const cityName = data.geonames[0].name;
        // store all local variables in global object        
        travelData['lat'] = lat;
        travelData['lon'] = lon;
        travelData['cityName'] = cityName;
        travelData['countryCode'] = countryCode;
        console.log(travelData);

        // return travelData;
        // fetch weather data from weatherbit
        return await weatherData(lat, lon, countryCode, cityName);
    }


    // fetch weather data from weatherbit using lat, lon, country code, and city name from the global object
    const weatherData = async function (lat, lon, countryCode, cityName) { 
        // const response = await fetch(`${wURL}?lat=${lat}&lon=${lon}&city=${cityName}&country=${countryCode}&key=${wApiKey}&start_date=${travelData.startDate}&end_date=${travelData.endDate}`);

        const response = await fetch(`${wURL}?lat=${lat}&lon=${lon}&city=${cityName}&country=${countryCode}&key=${wApiKey}`);
        const dataJson = await response.json();
        let days = dataJson.data;
        let daysNum = Number(days.length-1);
        // select specified weather data from weatherbit
        let description = days.map(day => day.weather.description);
        let temp = days.map(day => day.temp);
        let minTemp = days.map(day => day.min_temp);
        let maxTemp = days.map(day => day.max_temp);
        let humidity = days.map(day => day.rh);
        let windSpeed = days.map(day => day.wind_spd);
        let icons = days.map(day => day.weather.icon);
        // store weather data in global object
        travelData['desciption'] = description;
        travelData['temp'] = temp;
        travelData['minTemp'] = minTemp;
        travelData['maxTemp'] = maxTemp;
        travelData['humidity'] = humidity;
        travelData['windSpeed'] = windSpeed;
        travelData['icons'] = icons;
        
        console.log(travelData);

        return travelData;
    }
    

    // fetch image from pixabay
    const imageData = async function (cityName) { 
        const response = await fetch(`${pURL}?key=${pApiKey}&q=${cityName}&image_type=photo&pretty=true`);
        const data = await response.json();
        // store image data in global object
        travelData['imageDestination'] = data.hits[0].largeImageURL;
        console.log(travelData.imageDestination);

        return travelData;
    }


// post data to server
const postData = async function (data) {
    console.log(data);
    // default options
    const response = await fetch("http://localhost:5001/tripData", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
}