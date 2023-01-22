const express = require("express");
require('dotenv').config() 
const cors = require('cors')
const { connection } = require("./database/config");



//crear server

const app = express()

//connect BD
connection(); 

//CORS
app.use(cors())

//rutas 

app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json())

//RUtas auth //Crud de login

app.use('/api/auth', require('./routes/auth'));

//Rutas Events / Crud Events
app.use('/api/events', require('./routes/events'));



//listen
app.listen(process.env.PORT, ()=>{
    console.log('Server running in port ' + process.env.PORT )
})

