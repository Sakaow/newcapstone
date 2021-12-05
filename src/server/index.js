const dotenv = require("dotenv")
dotenv.config()

const path = require("path")
const express = require("express")
const fetch = require("node-fetch")
let projectData = {}

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const cors = require("cors")
const { response } = require("express")
app.use(cors())

app.use(express.static('dist'))

app.get('/', function (req, res) {
    // res.sendFile(path.resolve('dist/index.html'))
    res.sendFile(path.resolve('src/server/index.html'));
})

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})


app.get('/all', function sendData(request,response){
    response.send(projectData)
});


app.post('/vactionData', addData);
function addData(req, res) {
    let data = req.body;
    console.log('server side data ', data)
    projectData['lattitude'] = data.lattitude;
    projectData['longitutde'] = data.longitutde;
    projectData['city'] = data.city;
    projectData['image'] = data.image;
    projectData['country'] = data.country;
    projectData['description'] = data.description;

    res.send(projectData);
}


module.exports = app