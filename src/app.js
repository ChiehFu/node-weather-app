const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Defind paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to search 
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Jeff'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:'Jeff'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText:'Instructions',
        name:'Jeff'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }


    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        } 
    
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error
                });
            }
            return res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error:'Help article not found.',
        name:'Jeff'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error:'Page not found.',
        name:'Jeff'
    });
});


app.listen(port, () => {
    console.log('Server is up on port' + port + '.');
});