// Update UI of the application
const updateUI = async function() {
    const request = await fetch("http://localhost:8081/all");
    const resData = await request.json();

    // update the content of the UI
    document.querySelector("#city-img").src = resData.imageDestination;
    document.getElementById("city-des").innerHTML = `<p><span>Trip to: </span>${resData.cityName}, ${resData.countryName}</p>`;
    document.getElementById("date-start").innerHTML = `<p><span>Departing: </span>${resData.startDate}</p>`;
    document.getElementById("date-end").innerHTML = `<p><span>Returning: </span>${resData.endDate}</p>`;
    document.getElementById("days-of-trip").innerHTML = `<p>Days of trip: </span>${resData.daysOfTrip} days</p>`;
    document.getElementById("temparature").innerHTML = `<p>Weather: ${resData.temp}°C </p>`;
    document.getElementById("weather-icon").src = resData.icons;
    document.getElementById("low-high").innerHTML = `<p>Hight: </span>${resData.maxTemp}°C  Low: ${resData.minTemp}°C </p>`;

}

export { updateUI };