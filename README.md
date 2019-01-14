# Weather App


### Stack

- node.js
- yargs
- request
- axios

### About

App allows to show up the weather. <br />
APIs are `mapquestapi.com` for geodata and `darksky.net` for weather.

App has two solutions: 
1. `app-callbacks` made with callbacks and `request` library
2. `app-promises` made with promises and `axios` library 

### Before the start

To run the app you have to create api keys in chosen folder  and make a file config.js with the following data:
```
module.exports = {
    geoURL: 'http://www.mapquestapi.com/geocoding/v1/address?key=YOUR_KEY',
    weatherURL: 'https://api.darksky.net/forecast/YOUR_KEY/'
}
```


### Essential Commands

`node app.js --help` to look at the available commands.

`node app.js -a [address]` to fetch the weather in current zone.
