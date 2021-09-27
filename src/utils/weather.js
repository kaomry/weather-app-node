const request = require('postman-request')

const forcast = (latitude,longitude, callback) => {
const url = `http://api.weatherstack.com/current?access_key=ccbd0b814b211b298a43b6ef45058254&query=${latitude},${longitude}`
request({url, json:true}, (error, response) =>{
    if(error){
            callback('Unable to connect weather service.', undefined)
        } else if(response.body.error){
            callback('Unable to find location.', undefined)
        } else{
            callback(undefined,{
                degreess:  response.body.current.temperature,
                feelsLike: response.body.current.feelslike
            })  
        }
    })

}

module.exports = forcast