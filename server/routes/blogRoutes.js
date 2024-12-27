const express = require('express');
const blog = require('../models/blog');
const router = express.Router();

// get all blogs
router.get('/',async(req,res) =>{
    try{
        const blogs = await blog.find().sort({createdAt:-1});
        res.status(200).json(blogs);
    }
    catch(error) {
        res.status(500).json({error:error.message});
    }
});

//add posts
router.post('/',async (req,res) => {
    try{
        const newBlog = new blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    }
    catch{
        res.status(500).json({error: error.message});
    }
});

//get blogs by ID
router.get('/:id', async (req,res) => {
    try {
      const singleblog = await blog.findById(req.params.id);
      if (!singleblog) return res.status(404).json({ message: 'Blog not found' });
      res.status(200).json(singleblog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

//Update blogs by ID
router.put('/:id', async(req,res) => {
    try{
        const updatedBlog = await blog.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!updatedBlog) res.send(404).json({message: 'blog not found!'});
        res.status(201).json(updatedBlog);
    }
    catch{
        res.status(500).json({error: error.message});
    }
});

//Delete blogs by ID
router.delete('/:id', async(req,res) => {
    try{
        const deleteBlog = await blog.findByIdAndDelete(req.params.id);
        if(!deleteBlog) return res.status(404).json({message: 'Blog not found'});
        res.status(200).json({message: 'Blog Deleted Successfully' });
    }
    catch{
        res.status(400).json({error: error.message});
    }
});

module.exports = router;