const authController = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { json } = require('express')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../middlewares/verifyToken')

//register

authController.post('/register' ,async(req,res) => {
    try {
        const isExisting = await User.findOne({email : req.body.email})
        if(isExisting){
            throw new Error ('alredy such an account with this email..')
        } 
        const hashPassword = await bcrypt.hash(req.body.password ,10)
    
        const newUser = await User.create({ ...req.body, password: hashPassword})
        const {password, ...others} = newUser._doc
        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})
    

        return res.status(201).json({others,token})

    } catch (error) {
        return res.status(500).json(error.message)
        console.log(error,"error in authController");
    }

})

// login
authController.post('/login' , async (req,res)=>{
    try {
        const user = await User.findOne({email : req.body.email})
        
        console.log(user,"userdata");
        if(!user){
            console.log("user not exist");
            // throw new Error("User not exists")
            return 
        }

        const comparePass = await bcrypt.compare(req.body.password, user.password)
        console.log(comparePass);
        if(!comparePass){
            console.log("user password wrong");
            return
            // throw new Error("user password is not correct")
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id : user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '5h'})

        return res.status(201).json({others , token})

    } catch (error) {
        // console.log(error);
       return res.status(500).json(error.message)
    }
})

module.exports = authController