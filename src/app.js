
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// Geocode and weather utils
const geocode = require('./utils/geocode')
const forcast = require('./utils/weather')

console.log(path.join(__dirname,'../public'))

const app = express()

// Define pathe for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather app',
        name: 'Omry'
    })
})

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Omry'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help',
        helpText: 'bla bla bla',
        name: 'Omry'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) =>{
        if(error){
            return res.send({error})
        }
    
        forcast(latitude, longitude, (error,forcstData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forcast: forcstData,
                location,
                address: req.query.address 
            })
        })
    })
})

app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    
    req.query
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'About me',
        name: 'Omry',
        errorMessage:'Help artical was not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: 'About me',
        name: 'Omry',
        errorMessage:'My 404 page'
    })
})

app.listen(3000, ()=>{
    console.log('The server is up on port 3000.')
})