require('dotenv').config()
const request = require('request')
const yargs = require('yargs')

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

let address = encodeURI(argv.address)

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=${address}`,
  json: true
}, (error, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2)) // pretty printing

  console.log(`Address: ${body.results[0].formatted_address}`)
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
})