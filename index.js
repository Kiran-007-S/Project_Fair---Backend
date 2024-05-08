// loads .env file into process.env
require('dotenv').config();  // Loads .env file contents into process.env by default.

// import express
const express = require('express');

// import cors
const cors = require('cors');

const db=require('./DB/connection')
const router = require('./Routes/route')

// Create a backend application using express
const pfserver = express()

// use
pfserver.use(cors())
pfserver.use(express.json()) // returns middleware that only parses json
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

// port creation
const PORT = 4000 || process.env.PORT

// server listen
pfserver.listen(PORT,()=>{console.log('listening on port' + PORT);})

pfserver.get('/',(req,res)=>{
    res.send(`<h1>Project Fair is Started</h1>`)
})