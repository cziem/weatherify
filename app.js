require('dotenv').config()
const request = require('request')

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=1301%20lombard%20street%20philadelphia`,
  json: true
}, (error, response, body) => {
  try {
    console.log(body)
  } catch (e) {
    if (e) {
      console.log(error)
    }
  }
})