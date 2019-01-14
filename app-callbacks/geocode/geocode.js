const apiData = require('../config');
const request = require('request');

module.exports = {
    getAdress: (address, callback) => {
        // encode string for url (change space to %20), opposite is decodeURIComponent
        const encodedAddress = encodeURIComponent(address);

        request(
            {
                url: `${apiData.geoURL}&location=${encodedAddress}`,
                json: true
            },
            (error, response, body) => {
                if (error) {
                    callback('Unable to connect to servers');
                } else if (!body) {
                    callback('Wrong Address');
                } else {
                    const {
                        adminArea5,
                        adminArea1,
                        latLng
                    } = body.results[0].locations[0];

                    const result = {
                        address: `${adminArea5} ${adminArea1}`,
                        lat: latLng.lat,
                        lng: latLng.lng
                    };

                    callback(null, result);
                }
            }
        );
    }
};
