
// import modal

const projects =require('../model/projectSchema')

exports.addproject = async (req , res)=>{
 console.log('inside porject add controller');
//  request payload
 const userId = req.payload
 console.log(userId);
 
 const projectImage = req.file.filename
 console.log(projectImage);

 const {title,language,github,website,overview} = req.body
 console.log(`${title},${language},${github},${website},${overview},${projectImage},${userId}`);

 try {
   const ExistingProject = await projects.findOne({github})
   
   if(ExistingProject){
      res.status(406).json('Project Already Exist.....Please upload a new Projects')
   }
   else{
      const newProjects = new projects({
         title,
         language,
         github,
         website,
         overview,
         projectImage,
         userId
      })
      await newProjects.save()
      res.status(200).json(newProjects)
   }

 } catch (err) {
   res.status(401).json(`request failed due to ${err}`)
 }

//  multer for handling multipart data
 
}

// home projects

exports.gethomeProject = async(req , res)=>{
   try {
      const homeProject = await projects.find().limit(3)
      res.status(200).json(homeProject)
   } catch (err) {
      res.status(401).json(`request failed due to ${err}`)
   }
}

// all projects

exports.getallProjects = async(req , res)=>{
   const search =  req.query.search
   console.log(search);
   const query = {
      language:{
         $regex:search,$options:'i'
      }
   }
   try {
      const allProjects=  await projects.find(query)
      res.status(200).json(allProjects)
      
   } catch (err) {
     res.status(401).json(`request failed due to ${err}`) 
   }
}

// userprojects

exports.getuserProjects = async(req,res)=>{
   const userId = req.payload
   try {
      const userProjects = await projects.find({userId})
      res.status(200).json(userProjects)
      
   } catch (err) {
      res.status(401).json(`request failed due to ${err}`) 
   }
}

// today 17/1

//edi project 

exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const {title,language,github,website,overview,projectImage} = req.body
    const uploadedProjectImage = req.file?req.file.filename:projectImage

    try {
      const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadedProjectImage,userId},{new:true})

      await updateProject.save()
      res.status(200).json(updateProject)
    } catch (err) {
      res.status(401).json(err)
    }
}

// delete project 

exports.deleteProject = async(req,res)=>{
   const {id} = req.params

   try {
      const removeProject = await projects.findByIdAndDelete({_id:id})
      res.status(200).json(removeProject)
   } catch (err) {
      res.status(401).json(err)
   }
}


