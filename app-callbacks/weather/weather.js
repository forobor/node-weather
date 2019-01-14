const request = require('request');
const apiData = require('../config');

module.exports = {
    getWeather: (lat, lng, callback) => {
        request(
            {
                url: `${apiData.weatherURL}${lat},${lng}?units=auto`,
                json: true
            },
            (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    const { temperature, apparentTemperature } = body.currently;
                    const result = {
                        temperature,
                        apparentTemperature
                    };
                    callback(null, result);
                } else {
                    callback('Unable to fetch weather');
                }
            }
        );
    }
};
