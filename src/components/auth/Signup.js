import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const { username, email, password, role } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      enqueueSnackbar(data.msg, { variant: response.ok ? 'success' : 'error' });
      if (response.ok) {
        navigate('/login');
      }
    
    } catch (error) {
      enqueueSnackbar('Error: ' + error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
      
  return (
    <Container maxWidth="xs" style={{ overflow: 'hidden' }}> 
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
              inputProps={{ minLength: 3 }}
              error={username && username.length < 3}
              helperText={username && username.length < 3 && "Username is required and should be at least 3 characters"}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
                required
                fullWidth
                labelId="role-label"
                id="role"
                name="role"
                value={role}
                onChange={e => onChange(e)}
                label="Role"
            >
                <MenuItem value={'DJ'}>DJ</MenuItem>
                <MenuItem value={'Promoter'}>Promoter</MenuItem>
                <MenuItem value={'Listener'}>Listener</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => onChange(e)}
              error={!email}
              helperText={!email && "Valid email is required"}
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
              inputProps={{ minLength: 6 }}
              error={password && password.length < 6}
              helperText={password && password.length < 6 && "Password should be at least 6 characters"}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
