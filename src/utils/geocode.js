const request = require('postman-request');
const {access_token} = require('../../secrets');
const geocode = (address, callback) => {
  encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?limit=1&access_token=${access_token}`;

  request({url, json: true}, (error, response, body) => {
    if (error) {
      callback('Whoops, unable to connect to location service!', undefined);
    } else if (!body.features || !body.features.length) {
      callback('Whoops, location not found! Please try new search.', undefined);
    } else {
      let latitude = body.features[0].center[1];
      let longitude = body.features[0].center[0];
      let location = body.features[0].place_name;
      callback(undefined, {latitude, longitude, location});
    }
  });
};

module.exports = geocode;
