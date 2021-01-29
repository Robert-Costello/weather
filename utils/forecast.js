const request = require('postman-request');
const key = require('../secrets');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`;
  request({url, json: true}, function (error, response, body) {
    if (error) {
      callback('Whoops, unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const {temperature: temp, feelslike} = body.current;
      callback(
        undefined,
        `The current temperature is ${temp}°. It feels like ${feelslike}°.`
      );
    }
  });
};

module.exports = forecast;
