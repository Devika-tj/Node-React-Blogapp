import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Learnmore = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{blog.title}</h2>
      <img src={blog.image} alt={blog.title} style={{ width: '100%', maxHeight: '400px' }} />
      <p>{blog.description}</p>
      <p>{blog.content}</p>
    </div>
  );
};

export default Learnmore;