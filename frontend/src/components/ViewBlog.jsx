import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const ViewBlog = () => {
  const [blogs, setblogs] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get("http://localhost:3000/blogs/")
      .then((res) => {
        setblogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/blogs/delete/${id}`);
      setblogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const updateblog = (blog) => {
    navigate('/add', { state: { blog } }); 
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
      {blogs.map((blog, index) => (
        <Card key={index} sx={{ maxWidth: 400, marginTop: 2 }}>
          <CardMedia sx={{ height: 250 }} image={blog.image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {blog.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => updateblog(blog)}>Update</Button>
            <Button size="small">Learn More</Button>
            <Button size="small" onClick={() => handleDelete(blog._id)}>Delete</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ViewBlog;