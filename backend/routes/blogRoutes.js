const express=require('express')
const router= express.Router();
const blogSchema = require('../models/blogdata');

// GET

router.get('/', async (req, res) => {
  try {
    const blogs = await blogSchema.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to blogs' });
  }
});

// POST
router.post("/add", async (req, res) => {
  try {
    const newBlog = new blogSchema(req.body); 
    await newBlog.save();
    res.json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add blog' });
  }
});

// DELETE
router.delete('/delete/:id', async (req, res) => {
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
router.put('/update/:id', async (req, res) => {
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