const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");
// const port = process.env.PORT || 8081;
const projectData = {};
const app = express();
const { response } = require("express");
app.use(cors()); // Cross Origin Resource Sharing

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

app.get('/', function (req, res) {
    // res.sendFile(path.resolve('dist/index.html'))
    res.sendFile(path.resolve('src/server/index.html'));
});

// testing endpoint with supertest
app.get('/connected', function (req, res) {
    res.json({
        author: "Sakaowduan",
        title: "travelplan",
        description: "A travelplan app",
        provider: "udacity",
        server: "connected"
    });
});

app.get('/all', function sendData(request,response){
    response.send(projectData);
});

app.post('/tripData', function addData(req, res) {
    let data = req.body;
    console.log('Server POST data ', data)
    // projectData['data'] = data;
    projectData['cityName'] = data.cityName;
    projectData['countryName'] = data.countryName;
    projectData['startDate'] = data.startDate;
    projectData['endDate'] = data.endDate;
    projectData['daysOfTrip'] = data.daysOfTrip;
    projectData['daysAway'] = data.daysCount;
    projectData['temp'] = data.temp;
    projectData['minTemp'] = data.minTemp;
    projectData['maxTemp'] = data.maxTemp;
    projectData['icon'] = data.icon;
    projectData['description'] = data.description;
    projectData['imageDestination'] = data.imageDestination;
    // console.log('Server object data ', projectData);
    res.send(projectData);
});

// app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app