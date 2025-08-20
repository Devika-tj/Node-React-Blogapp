import React from 'react'
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function capValue(e) {
    e.preventDefault();

    console.log("Form Data Sent:", form); 

    axios.post("http://localhost:3000/user/login", form) 
      .then((res) => {
        console.log("Response from backend:", res.data); 
        alert(res.data.message);
        if (res.data.message === "Login successful") {
          navigate('/');
        }
      })
      .catch((err) => {
        if (err.response) {
          
          console.error("Backend error:", err.response.data);
          alert(err.response.data.message);
        } else {
         
          console.error("Network/Server error:", err.message);
          alert("Server not reachable");
        }
        navigate('login');
      });
  }

  return (
    <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'serif', fontStyle: 'oblique' }}>LOGIN</h1>
         <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
      noValidate
      autoComplete="off"
      onSubmit={capValue}
    >
      
      <TextField value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })} label="Username" variant="filled" />
      <br />
      <TextField value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} label="Email" variant="filled" />
      <br />
      <TextField value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} label="Password" variant="filled" />
      <br />
      <Button type='submit' variant="contained" style={{ backgroundColor: '#2c0e69ff' }}>Login</Button>

      
    </Box>

      
    </div>
  )
}

export default Login
