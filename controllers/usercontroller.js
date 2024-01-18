//import modal 
const users = require('../model/userSchema')

// import jwt 
const jwt = require('jsonwebtoken')

//register request
exports.register = async (req, res)=>{
    console.log("inside the controller - register function");
    //get extract data from request body - json format is converted into javascript object by json() so that we can directly destructure the key from the req body
    const{username,email,password}=req.body
   
    // check email for the unique indentification
     try {const existUser = await users.findOne({email})
     if(existUser){
        //if document is present 
        res.status(406).json('Account Already Exist.....  Please Login')
     }else{
        //need to register
          // 1) create a object for model 
             const newUser = new users({
                username,
                email,
                password,
                github:"",
                linkedin:"",
                profile:""


             })
            //  2) add to mongodb - use save method in mongoose
            await newUser.save()
         // response
        res.status(200).json(newUser)
     }
    } // runtime errors are resolved using try-catch block
    catch(err){
        res.status(401).json(`register request failed due to ${err} `)
    }
    //logic
}


// login request
exports.login = async (req,res)=>{
  // authenticating email and password
  const {email,password} = req.body
  // find email and password
   try {const existingUser = await  users.findOne({email,password})
  console.log(existingUser);

  if(existingUser){
    // jwt token
    // 3 sign method is used to create token - it expects two arguments
    // 1 payload - secretly transmitted information 
    // 2 secrets or private - key based on which the token is generated
    const token = jwt.sign({userId:existingUser._id},"secretekey12345")
    
    // response - sending as object because we are sending more data
    res.status(200).json({
        existingUser,
        token
    })
  }
  else{
    res.status(404).json('invalid EmailId or Password')
  }
}catch(err){
    res.status(401).json(`login request failed due to ${err}`);
}

} 

//406 unprossible entity - client error

