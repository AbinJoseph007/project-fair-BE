//import mangoos

const mongoose = require('mongoose')

//acccess connection string of mongo db

const connectionString = process.env.DATABASE

// connect server with the mongodb

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connection successfully');
}).catch((err)=>{
    console.log(`mongodb connection failed due to : ${err}`);
})