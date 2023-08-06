const blogController = require('express').Router()
const { verifyToken, verifyTokenAdmin } = require('../middlewares/verifyToken')
const Blog = require('../models/Blog')
const mongoose = require("mongoose");

const ObjectId = require('mongoose')
blogController.get('/',async (req,res)=>{
    try {
        const blogs=await Blog.find({})
        return res.status(500).json(blogs)
    } catch (error) {
        console.log(error);
    }
} )

// blogController.post('/',verifyToken, async (req,res)=>{
//    try {
//     const newBlog = await Blog.create({ ...req.body})
//     return res.status(201).json(newBlog)
//    } catch (error) {
//     console.log(error)
//    }
// })

blogController.post('/',verifyToken, async(req,res)=>{
    try {
        const blog = await Blog.create({...req.body, userId : req.user.id})
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

blogController.delete('/:id', verifyToken, async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.user.id);
        const blog = await Blog.findById(req.params.id)
        console.log(blog.userId.toString());
        console.log(req.user.id.toString());
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
          }
        if(blog.userId.toString() !== req.user.id.toString()){
            console.log("not a valid user");
            return res.status(403).json({ error: 'You can delete only your own posts' });
        }
        
        await Blog.findByIdAndDelete(req.params.id)

        return res.status(200).json({msg: "Successfully deleted the blog"})
    } catch (error) {
      return res.status(500).json(error);
    }
  });




  blogController.get('/find/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

blogController.put("/updateBlog/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        console.log(blog,"updateblog");
        console.log(req.body);
        if (blog.userId.toString() !== req.user.id.toString()) {
            console.log("you can not update ");
            throw new Error("You can update only your own posts")
        }

        const updatedBlog = await Blog
            .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
console.log(updatedBlog,"updatedblog");
        return res.status(200).json(updatedBlog)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

  

module.exports = blogController