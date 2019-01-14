const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .option({
        address: {
            demand: true,
            alias: 'a',
            string: true,
            describe: 'Address'
        }
    })
    .help().argv;

geocode.getAdress(argv.address, (error, resultGeo) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Looking for weather in ${resultGeo.address}...`);
        weather.getWeather(
            resultGeo.lat,
            resultGeo.lng,
            (error, resultWeather) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(
                        `Weather in ${resultGeo.address} is ${
                            resultWeather.temperature
                        } degree, but feels ${
                            resultWeather.apparentTemperature
                        }.`
                    );
                }
            }
        );
    }
});
