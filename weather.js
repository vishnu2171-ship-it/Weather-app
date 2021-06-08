const express = require('express')
const path = require('path')
const hbs = require ('hbs')
const app = express()
const PORT = process.env.PORT || 8000

//setting partial path
const partial_path = path.join(__dirname,'./partials')
const public_path = path.join(__dirname,'./public')

//setting view-engines
app.set('view engine', 'hbs')

//registering partials
hbs.registerPartials(partial_path)
app.use(express.static(public_path))

//listening to port 8080
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})

//middlewares....

app.get('/',(req,res)=>{
   res.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/weather',(req,res)=>{
    res.render('weather')
})

app.get('*',(req,res)=>{
    res.render('404')
})

