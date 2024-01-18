// import multer

const multer = require('multer')

// create 
// diskstorage is used to create the storage space 
const storage = multer.diskStorage({
    // destination : where location in which the file is stored
    // itshould be an arrow function
    destination:(req,file,callback)=>{
       callback(null,'./uploads')
    },
    // filename: the name in which the file is stored
    filename:(req,file,callback)=>{
      const filename =  `image-${Date.now()}-${file.originalname}`
      callback(null,filename)
    }
})

const fileFilter = (req,file,callback)=>{
   if(file.mimetype ==='image/png' || file.mimetype ==='image/jpg' || file.mimetype ==='image/jpeg'){
    callback(null,true)
   }
   else{
    callback(null,false)
    return callback(new Error('only png,jpg,jpeg files are allowed'))
   }
}

// create multer configure

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig