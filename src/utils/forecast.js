const request = require('request')

const forecast =(latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=bbe094fdff209f9a3549cdedf16afa02&query=' + latitude + ',' + longitude + '&units=f'

    console.log(url)

    request({url, json: true}, (error, {body})=> {

        if (error){
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error){
            callback('No response from forecast services', undefined)

        } else {
            console.log(body.current)
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' +  body.current.feelslike + ' degrees out.' + 'The Humidity is ' + body.current.humidity)
        }      


    })
}

module.exports=forecast