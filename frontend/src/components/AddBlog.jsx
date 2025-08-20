import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import axiosinstance from '../axiosinstance';

const AddBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (location.state?.blog) {
      setFormData({
        title: location.state.blog.title,
        description: location.state.blog.description,
        image: location.state.blog.image
      });
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location.state?.blog?._id) {
      // Update blog
      axiosinstance.put(`http://localhost:3000/blogs/update/${location.state.blog._id}`, formData)
        .then((res) => {
          console.log("Blog updated:", res.data);
          alert("Blog updated successfully!");
          navigate('/');
        })
        .catch((err) => {
          console.error(err);
          alert("Error updating blog");
        });
    } else {
      
      axiosinstance.post('http://localhost:3000/blogs/add', formData)
        .then((res) => {
          console.log("Blog added:", res.data);
          alert("Blog added successfully!");
          setFormData({ title: '', description: '', image: '' });
        })
        .catch((err) => {
          console.error(err);
          alert("Error adding blog");
        });
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'serif', fontStyle: 'oblique' }}>
        {location.state?.blog ? 'EDIT BLOG' : 'ADD BLOG'}
      </h2>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '50ch' } }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField name="title" label="Title" variant="outlined" value={formData.title} onChange={handleChange} />
        <br />
        <TextField name="description" label="Description" variant="outlined" value={formData.description} onChange={handleChange} />
        <br />
        <TextField name="image" label="Image URL" variant="outlined" value={formData.image} onChange={handleChange} />
        <br />
        <Button type="submit" variant="contained" style={{ backgroundColor: '#180858ff' }}>
          {location.state?.blog ? 'UPDATE BLOG' : 'ADD BLOG'}
        </Button>
      </Box>
    </div>
  );
};

export default AddBlog;

