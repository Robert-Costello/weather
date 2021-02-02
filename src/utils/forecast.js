const request = require('postman-request');
const axios = require('axios');
const {key} = require('../../secrets');
const {response} = require('express');

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

const test = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}&units=f`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// test(22, -77);

module.exports = {forecast};
