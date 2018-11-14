require('dotenv').config()
const yargs = require('yargs')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'address to fetch weather for',
    string: true
  }
})
 .help()
 .alias('help', 'h')
 .argv

geocode.geocodeAdress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    // display the address querried
    console.log(results.address)

    // Get the weather results from our weatherify api
    weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
      }
    })
  }
})