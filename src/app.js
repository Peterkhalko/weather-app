const express = require('express')
const path = require('path')
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env || 3000
//define paths for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, 'templates/views')
//partial components paths
const partialsPath = path.join(__dirname, 'templates/partials')


//handle bar setup for static template acrros all pages
app.set('view engine', 'hbs')
app.set('views', viewsPath)
//partial components intitialized
hbs.registerPartials(partialsPath)

//root setup form search file travelling from here and serve the file
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weatherly',
        description: 'Pune',
        name: 'Peter Khalko'
    })
}
)

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about page',
        description: 'About page contains the description of the about',
        name: 'Peter Khalko'

    })
})

app.get('/weather', (req, res) => {
    //here if the !req.query.address is true flow exists and returns error: you must provide address
    if (!req.query.address) {
        return res.send({
            error: 'You must provide Address  '
        })
    }
    geocode(req.query.address, (error, geoData = {}) => {
        if (error) {
            res.send({
                error: 'Please provide a valid address',
                Location: req.query.address
            })
        } else {
            forecast(geoData.latitude, geoData.longitude, geoData.location, (error, forecastData) => {
                res.send({
                    location: forecastData.location,
                    current_Weather: forecastData.description,
                    temperature: forecastData.temperature,
                    feelLikeTemperature: forecastData.feelslike,
                    weather_icons: forecastData.weather_icons
                })
            })

        }
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help page',
        description: 'help page contains the description',
        name: 'Peter Khalko'
    })
})


//Error 404 handler , Explicitly should come to the late route
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peter Khalko',
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peter Khalko',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {

    console.log('Express server started');
})