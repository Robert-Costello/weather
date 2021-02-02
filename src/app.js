const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handlebars engine and views source
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res, next) => {
  res.render('index', {
    title: 'Weather',
    name: 'Robert Costello',
  });
});

app.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About',
    name: 'Robert Costello',
  });
});

app.get('/help', (req, res, next) => {
  res.render('help', {
    title: 'Help',
    name: 'Robert Costello',
  });
});

app.get('/weather', (req, res, next) => {
  res.setTimeout(15000, function () {
    res.send({error: 'Request has timed out. Please try again.'});
  });

  if (!req.query.address) {
    return res.send({error: 'Please provide address'});
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (!location) return console.log('Please provide location.');
    if (error) return console.log(error);

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return console.log(error);

      res.json({location, address: req.query.address, forecast: forecastData});
    });
  });
});

app.get('/products', (req, res, next) => {
  if (!req.query.search) {
    return res.send({error: 'Please provide search term'});
  }
  res.send({product: [req.query.search]});
});

app.get('/help/*', (req, res, next) => {
  res.render('404', {error: 'Help article not found', name: 'Robert Costello'});
});

app.get('*', (req, res, next) => {
  res.render('404', {error: 'Page not found', name: 'Robert Costello'});
});

app.listen(8080, () => {
  console.log('Serving on port 8080!');
});
