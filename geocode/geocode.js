const request = require('request')

const geocodeAdress = (address, callback) => {
  let encodedAddress = encodeURI(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    // console.log(JSON.stringify(body, undefined, 2)) // pretty printing
    if (error) {
      callback('Unable to connect to google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to locate the provided address')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        lat: body.results[0].geometry.location.lat,
        lng: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports.geocodeAdress = geocodeAdress;