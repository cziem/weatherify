const request = require('request')

const geocodeAdress = (address) => {
  let encodedAddress = encodeURI(address)

  return request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2)) // pretty printing
    if (error) {
      console.log('Unable to connect to google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to locate the provided address')
    } else if (body.status === 'OK') {
      console.log(`Address: ${body.results[0].formatted_address}`)
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
    }
  })
}

module.exports.geocodeAdress = geocodeAdress;