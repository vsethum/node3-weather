const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vijay Sethumadavan'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Vijay Sethumadavan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Please call me if you need help',
        title: 'Help',
        name: 'Vijay Sethumadavan'
    })
})


//app.com/weather

app.get('/weather', (req, res)=>{

    const address = req.query.address

    if(!address){
        return res.send({
            error: 'Please provide an address'
        })

    } else {
        geocode(address, (error, {latitude, longitude, location}={}) => {

            if (!address){
                console.log('Please provide an address')
            } else {
        
            if(error) {
                return res.send({error})
            } else {   
           
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error){
                        return res.send({error})
                    } else {
                        res.send({
                            location: location,
                            forecast: forecastData                            ,
                            address: address
                        })
                        
                    }
              })
            }
        }
            
        })
    }
    
})

app.get('/products', (req, res)=> {

    console.log(req.query.search)

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Vijay Sethumadavan',
        errorMessage: 'Help article not Found'
    })
})

//404 page
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Vijay Sethumadavan',
        errorMessage: 'Page not Found'
    })
})


app.listen(3000, ( )=> { 
    console.log('Server is up on port 3000')
})


