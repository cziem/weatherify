const request = require('request')

const geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURI(address)

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.API_KEY}&address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      // console.log(JSON.stringify(body, undefined, 2)) // pretty printing
      if (error) {
        reject('Unable to connect to google servers.')
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to locate the provided address')
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          lat: body.results[0].geometry.location.lat,
          lng: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

geocodeAddress('niger')
  .then((location) => {
    console.log(JSON.stringify(location, undefined, 2))
  }, (errorMessage) => {
    console.log(errorMessage)
  })