import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';

function Signup() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { username, email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password
    };
    try {
      const response = await fetch('http://localhost:4000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      enqueueSnackbar(data.msg, { variant: response.ok ? 'success' : 'error' });
      if (response.ok) {
        navigate('/login');
      }
    
    } catch (error) {
      enqueueSnackbar('Error: ' + error.message, { variant: 'error' });
    }
  };
      
  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h4">Sign Up</Typography>
      </Box>
      <Box component="form" onSubmit={e => onSubmit(e)}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="text"
              value={username}
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => onChange(e)}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
