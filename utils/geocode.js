const request = require('postman-request');

const geocode = (address, callback) => {
  encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?limit=1&access_token=pk.eyJ1Ijoici1lLWMiLCJhIjoiY2tqMGUxcHVkNGltbzJzcGRram04cno0MSJ9.hIFsmVgN6bzSIsJW_C7RQQ`;

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
