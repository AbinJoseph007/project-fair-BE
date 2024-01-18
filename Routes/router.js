// set of paths to resolve request

// import express module
 const express = require('express')

 //import controller
  const userController = require('../controllers/usercontroller')

//   import project controller
const projectcontroller = require('../controllers/projectcontroller')

// import jwtMiddleware

const middlewareJwt = require('../middleware/middlewareJwt')

// import multer

const multerConfig = require('../middleware/multerMiddleware')



//  create an object for router class inside express module
const router = new express.Router()

// setup paths

//   a register
      router.post('/user/register',userController.register)  //objectname.httpmethod('where should this store',()=>{how to resolve})

      // login 
      router.post('/user/login',userController.login)

      // add project
      router.post('/projects/add',middlewareJwt,multerConfig.single('projectImage'),projectcontroller.addproject)

      // home projects 
      router.get('/project/home-project',projectcontroller.gethomeProject)

      // all project
      router.get('/project/all-project',middlewareJwt,projectcontroller.getallProjects)

      // userporjects
      router.get('/user/user-projects',middlewareJwt,projectcontroller.getuserProjects)
       

      //today
      // edit project 
      router.put('/user-projects/edit/:id',middlewareJwt,multerConfig.single('projectImage'),projectcontroller.editUserProject)

      // delete project
      router.delete('/user-projects/remove/:id',middlewareJwt,projectcontroller.deleteProject)



// export router 
module.exports = router