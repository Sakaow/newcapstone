// Update UI of the application
const updateUI = async function() {
    const response = await fetch("http://localhost:8081/all");
    try {
        const resData = await response.json();
        // console.log(resData);
        // update the content of the UI
        document.querySelector("#place").src = resData.imageDestination;
        document.getElementById("city-des").innerHTML = `<p><span>Trip to: </span>${resData.cityName}, ${resData.countryName}</p>`;
        document.getElementById("date-start").innerHTML = `<p><span>Departing: </span>${resData.startDate}</p>`;
        document.getElementById("date-end").innerHTML = `<p><span>Returning: </span>${resData.endDate}</p>`;
        document.getElementById("days-of-trip").innerHTML = `<p>Days of trip: ${resData.daysOfTrip} days</p>`;
        // document.querySelector("#iconImg").src = `./src/client/images/${resData.icon}.svg`;
        document.querySelector("#iconImg").src = `./src/client/images/${resData.icon}.svg`;
        document.getElementById("temparature").innerHTML = `<em>${resData.temp}°C </em>`;        
        document.getElementById("low-high").innerHTML = `<p>High: ${resData.maxTemp}°C  Low: ${resData.minTemp}°C </p>`;
        document.getElementById("detail").innerHTML = `<p>${resData.description} </p>`;
    } catch (err) {
        console.log("Something went wrong while update UI", err);
    }
}

export { updateUI };