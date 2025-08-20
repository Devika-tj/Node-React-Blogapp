const express=require('express')
const router= express.Router();
const blogSchema = require('../models/blogdata');
const jwt=require('jsonwebtoken')

function verifyToken(req,res,next){
  let token=req.headers.token
  try{
    if(!token)throw 'Unauthorized Access'
    let payload=jwt.verify(token,"secret")
    if(!payload) throw 'Unauthorized Access'
    next()
  }catch(err){
    res.json({message:err})
  }
  }

// GET

router.get('/', async (req, res) => {
  try {
    const blogs = await blogSchema.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to blogs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogdetails = await blogSchema.findById(req.params.id); 
    if (!blogdetails) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blogdetails);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog details' });
  }
});

// POST
router.post("/add",verifyToken, async (req, res) => {
  try {
    const newBlog = new blogSchema(req.body); 
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add blog' });
  }
});

// DELETE
router.delete('/delete/:id',verifyToken, async (req, res) => {
  try {
    const deletedBlog = await blogSchema.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully', deletedBlog });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// PUT
router.put('/update/:id',verifyToken, async (req, res) => {
  try {
    const updatedBlog = await blogSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blog' });
  }
});



module.exports = router;