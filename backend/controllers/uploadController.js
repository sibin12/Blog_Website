const uploadController = require('express').Router()

const multer = require('multer')
const { verifyToken } = require('../middlewares/verifyToken')

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{

    },
    filename :(req,res,cb)=>{
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage
    //same as storage:storage
})

uploadController.post('/image',verifyToken, upload.single('image'),(req,res)=>{
    try {
        return res.status(201).json({msg:"successfully added the image"})
    } catch (error) {
        console.log(error.message);
    }
})

module.exports = uploadController
