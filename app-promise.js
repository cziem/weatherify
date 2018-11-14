require('dotenv').config()
const yargs = require('yargs')
const axios = require('axios')

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

 let encodedAddress = encodeURI(argv.address)
 let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=${encodedAddress}`

 axios.get(geocodeUrl)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address')
    }

    let lat = response.data.results[0].geometry.location.lat
    let lng = response.data.results[0].geometry.location.lng
    let weatherUrl = `https://api.darksky.net/forecast/${process.env.FORECAST_KEY}/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)

    return axios.get(weatherUrl)
  })
  .then(response => {
    let temp = response.data.currently.temperature
    let appTemp = response.data.currently.apparentTemperature

    console.log(`It's currently ${temp}. It feels like ${appTemp}.`)
  })
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.')
    } else {
      console.log(error.message)
    }
  })