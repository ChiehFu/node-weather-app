const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b7a62dbca0833c5af735274eefca7cb7/'+ latitude + ',' + longitude + '?units=si';
    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to service!', undefined);
        } else if (body.error) {
            callback(body.error, undefined);
        } else {
            const forcastMsg = body.currently.summary + ' It\'s currently ' + body.currently.temperature + ' degrees out. There\'s a ' + body.currently.precipProbability + '% chance of rain. Current pressure: ' + body.currently.pressure;
            callback(undefined, forcastMsg);
        }
    });
};

module.exports = forecast;