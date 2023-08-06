const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const authController = require('./controllers/authController')
const app = express()
const blogController = require('./controllers/blogController')
// const uploadController = require('./controllers/uploadController')
const multer = require('multer')

//connect our db
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('database connected'))
.catch((err)=>console.log("db not connected",err))

//routes & middlewares 
//those two middlewares make req.body accessible, otherwise it would be undefined !!
app.use('/image', express.static('public/images'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth',authController)
app.use('/blog',blogController)
// app.use('/upload',uploadController)

app.listen(process.env.PORT ,()=> console.log(`server started on ${process.env.PORT}`))

// server is on 5000 port 

//multer
const storage = multer.diskStorage({
    destination : function(req, file, cb){
      cb(null, 'public/images')
    },
    filename:function(req,file, cb){
      cb(null, req.body.filename)
    }
  })
  
  const upload = multer({
    storage:storage
  })
  
  app.post('/upload', upload.single("image"), async(req, res)=>{
    return res.status(200).json({msg: "Successfully uploaded"})
  })