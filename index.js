const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const {
    json,
    text
} = require('express');
const app = express()


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))




app.get('/', (req, res) => {


    res.render('index', {
        data: ''
    });
})

app.get('/Noumea', (req, res) => {

    const key = "af749da417555397178030ead1ea5110";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Noumea&appid=" + key + "&units=metric";
    fetch(url)
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const data = res.status(200).json(json)
            const weatherData = text(data)
            res.render('list', {
                data: weatherData
            })
            console.log(weatherData);
        })




})



app.post('/', (req, res) => {
    const city = req.body.city ? req.body.city : "Noumea";
    const key = "af749da417555397178030ead1ea5110";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=metric";
    https.get(url, (response) => {
        if (response.statusCode === 200) {
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                res.render('index', {
                    data: weatherData
                });
            })
        } else {
            res.render('index', {
                data: "0"
            })
        }
    })
})



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})