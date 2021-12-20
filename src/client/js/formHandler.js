import moment from 'moment';
import { validateDate } from './validateDate';
import { config } from './config';
import { updateUI } from './updateUI';

// store data
const travelData = {};
// reference save form element
const saveTripBtn = document.querySelector('#saveBtn');

// the api keys are stored in config.js file
const wApiKey = config.wApiKey;
const pApiKey = config.pApiKey;
const geoname = config.geoname;

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
    let destination = document.querySelector('#destination').value.trim();
    let startDate = document.querySelector('#startDate').value;
    let endDate = document.querySelector('#endDate').value;

    let error = document.querySelector('#error');
    let errorMsg = document.querySelector('.error-message');
    // validate form data
    if (destination === '' || startDate === '' || endDate === '') {

        error.innerHTML = 'Please fill out all fields';
        error.style.display = 'block';
        error.style.color = 'red';
        error.style.fontSize = '1.3rem';

        //set timeout to hide error message
        setTimeout(function () {
            error.style.display = 'none';
        }, 3000);

    } else if (startDate > endDate) {

        errorMsg.innerHTML = 'Start date must be before end date';
        errorMsg.style.color = 'red';
        errorMsg.style.fontSize = '1.3rem';

        //set timeout to hide error message
        setTimeout(function () {
            errorMsg.style.display = 'none';
        }, 3000);

    } else {

        // format dates
        startDate = moment(startDate).format('LL');
        endDate = moment(endDate).format('LL');

        let daysOfTrip = validateDate(startDate, endDate);
                
        travelData.destination = destination;
        travelData.startDate = startDate;
        travelData.endDate = endDate;
        travelData.daysOfTrip = Number(daysOfTrip);        

        await cityNameFromGeo(travelData.destination);
        // await weatherData(travelData.lat, travelData.lon, travelData.countryName, travelData.cityName);    
        await imageData(travelData.cityName);
        await postData(travelData);
        await updateUI();
    }

    // after clicking save button, the remove button will be displayed
    const remove = document.querySelector('#removeBtn');
    remove.style.display = 'block';
        
}


// fetch city name from geonames and store lat, lon, country code, and city name
const cityNameFromGeo = async function (destination) {
    const response = await fetch(`${geonameURL}?q=${destination}&maxRows=10&username=${geoname}`)
    const data = await response.json();
    const lat = Math.floor(data.geonames[0].lat);
    const lon = Math.floor(data.geonames[0].lng);
    const countryName = data.geonames[0].countryName;
    const cityName = data.geonames[0].name;
    // store all local variables in global object        
    travelData['lat'] = lat;
    travelData['lon'] = lon;
    travelData['cityName'] = cityName;
    travelData['countryName'] = countryName;
    // console.log(travelData);

    // fetch weather data from weatherbit
    return await weatherData(lat, lon, countryName, cityName);
}


// fetch weather data from weatherbit using lat, lon, country code, and city name from the global object
const weatherData = async function (lat, lon, countryName, cityName) {

    const response = await fetch(`${wURL}?lat=${lat}&lon=${lon}&city=${cityName}&country=${countryName}&key=${wApiKey}`);
    const dataJson = await response.json();
    let days = dataJson.data;
    let daysNum = Number(days.length - 1);
    // select specified weather data from weatherbit
    let description = days[daysNum].weather.description;
    let temp = Math.round(dataJson.data[0].temp);
    let minTemp = Math.round(dataJson.data[0].min_temp);
    let maxTemp = Math.round(dataJson.data[0].max_temp);
    let icon = dataJson.data[0].weather.icon;


    // store weather data in global object
    travelData['description'] = description;
    travelData['temp'] = temp;
    travelData['minTemp'] = minTemp;
    travelData['maxTemp'] = maxTemp;
    travelData['icon'] = icon;

    // console.log(travelData);

    return travelData;
}


// fetch image from pixabay
const imageData = async function (cityName) {
    const response = await fetch(`${pURL}?key=${pApiKey}&q=${cityName}&image_type=photo&pretty=true`);
    try {
        const data = await response.json();
        // store image data in global object
        travelData['imageDestination'] = data.hits[0].largeImageURL;
        // console.log(travelData.imageDestination);
        return travelData;

    } catch (err) {
        console.log('error', err);
    }
}


// post data to server
const postData = async function (data) {
    const response = await fetch("http://localhost:8081/tripData", {
        // const response = await fetch("/tripData", {
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