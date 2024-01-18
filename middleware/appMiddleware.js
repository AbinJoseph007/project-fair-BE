// /applicable to entire project 

const appMiddleware = (req,res,next)=>{
    console.log('inside application sepcific middleware');
    next()
}

module.exports = appMiddleware