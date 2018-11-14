require('dotenv').config()
const request = require('request')

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  // console.log(JSON.stringify(body, undefined, 2)) // pretty printing

  console.log(`Address: ${body.results[0].formatted_address}`)
  console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
  console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
})