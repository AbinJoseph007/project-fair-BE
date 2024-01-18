// import jwt
const jwt = require('jsonwebtoken')

const middlewareJwt = (req,res,next)=>{
    console.log('inside jwt middleware');
    // logic
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);

    try {
       const jwtResponse = jwt.verify(token,"secretekey12345")
       console.log(jwtResponse);
       req.payload =jwtResponse.userId
       next()
    } 
    catch (err) {
      res.status(401).json('authorization failed ...Please Login')  
    }
}

module.exports = middlewareJwt