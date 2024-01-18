
// import dotenv
// require .env contents into process .env by default

require('dotenv').config()

// import express

const express = require('express')

// import cors

const cors = require('cors')

// import router
const router = require('./Routes/router')

//import connections.js file

require('./DB/connections')

// import application specific middleware

// const appMiddleware = require('./middleware/appMiddleware')

//  create server
const pfServer = express()

// use of cors in server
pfServer.use(cors())

// returns middleware that only parse.json - jasonserver
pfServer.use(express.json())

// 
//  pfServer.use(appMiddleware)

// use of router by  server
pfServer.use(router)

// server use uploads folder
// frist arg - the way in which other applicatation sholud use this folder
// sec - arg - exports that folder - express.static

pfServer.use('/uploads',express.static('./uploads'))

//  customize the port - by default - 3000
const PORT = 4000 || process.env //automaticaly select port      

// to run the server
pfServer.listen(PORT, ()=>{
    console.log(`SERVER RUNNIG SUCCESSFULLY AT PORT ${PORT}`);
})

pfServer.get('/',(req,res)=>{
  res.send(`<h1 style="color:red">project fair server runnig successfully and ready to accept requests for client</h1>`)
})

// post request
// pfServer.post('/',(req,res)=>{
//     res.send(`post request`)
// })
  
