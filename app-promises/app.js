const axios = require('axios');
const yargs = require('yargs');
const apiData = require('./config');

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `${apiData.geoURL}&location=${encodedAddress}`;

axios
    .get(geocodeURL)
    .then(response => {
        if (!response.data) {
            throw new Error('Wrong address');
        }
        const {
            adminArea5,
            adminArea1,
            latLng
        } = response.data.results[0].locations[0];
        const { lat, lng } = latLng;
        const weatherURL = `${apiData.weatherURL}${lat},${lng}?units=auto`;
        console.log(
            `Looking for weather in ${adminArea5 + ' ' + adminArea1}...`
        );
        return axios.get(weatherURL);
    })
    .then(response => {
        console.log(Object.keys(response))
        const { temperature, apparentTemperature } = response.data.currently;
        console.log(
            `Weather is ${temperature} degree, but feels ${apparentTemperature}.`
        );
    })
    .catch(error => {
        if (error.response) {
            console.log(
                'error:',
                error.response.status,
                error.response.statusText
            );
        } else {
            console.log(error);
        }
    });
