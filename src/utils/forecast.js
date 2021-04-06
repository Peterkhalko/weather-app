const request = require('postman-request')
const chalk = require('chalk')
const forecast = (latitude, longitude, location, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c0d0059e862ce0aab4dc31d0669d666c&query=' + latitude + ',' + longitude;
  //destructed url , initially , url: url, and body is directly the result property form request
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to find the location', error)
    } else if (body.error) {
      callback('No such location', error)

    } else {

      callback(undefined, {
        location: location,
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        weather_icons:body.current.weather_icons
      })

    }

  })
}

module.exports = forecast;