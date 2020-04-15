const request = require('request')

const forecast =(latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=bbe094fdff209f9a3549cdedf16afa02&query=' + longitude + ',' + latitude + '&units=f'

    console.log(url)

    request({url, json: true}, (error, {body})=> {

        if (error){
            callback('Unable to connect to forecast services', undefined)
        } else if (body.error){
            callback('No response from forecast services', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' +  body.current.feelslike + ' degrees out.')
        }      


    })
}

module.exports=forecast