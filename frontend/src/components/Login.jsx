import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  return (
    <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'serif', fontStyle: 'oblique' }}>LOGIN</h1>
         <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
      noValidate
      autoComplete="off"
    >
      
      <TextField id="filled-basic" label="Username" variant="filled" />
      <br />
      <TextField id="filled-basic" label="Email" variant="filled" />
      <br />
      <TextField id="filled-basic" label="Password" variant="filled" />
      <br />
      <Button variant="contained" style={{ backgroundColor: '#2c0e69ff' }}>Login</Button>

      
    </Box>

      
    </div>
  )
}

export default Login
