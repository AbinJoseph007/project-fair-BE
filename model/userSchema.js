//import mongoose

const mongoose = require('mongoose')

//create shema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3, 'must be atleats 3 characters but gotb {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        //if the input value is not a proper email id the it throw error and return invalid email
        //isEmail is a method in validator which check wheather the input is a proper mail id or not
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    profile:{
        type:String
    }
})


//create model

const users = mongoose.model("users" , userSchema)

//export
module.exports = users