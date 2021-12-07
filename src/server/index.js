const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const cors = require("cors");
// const fetch = require("node-fetch");
const port = process.env.PORT || 5000;
const projectData = {};
const app = express();
const { response } = require("express");
app.use(cors()); // Cross Origin Resource Sharing

const bodyParser = require('body-parser');
// Built-in middleware to handles form data (urlencoded)
app.use(express.urlencoded({ extended: false }));
// built-in middleware to handle json data
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())



// serve static files
// app.use(express.static('src/client'))
app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile(path.resolve('dist/index.html'))
    res.sendFile(path.resolve('src/server/index.html'));
})

app.get('/all', function sendData(request,response){
    response.send(projectData)
});


app.post('/tripData', function addData(req, res) {
    let data = req.body;
    console.log('Server POST data ', data)
    projectData['data'] = data;
    
    res.send(projectData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app