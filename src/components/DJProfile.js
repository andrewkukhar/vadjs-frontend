import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

function DJProfile({ dj }) {
  console.log('Received DJ:', dj); // Debug log

  if (!dj) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={2}
    >
      <Avatar 
        alt={dj.name} 
        src={dj.image} 
        sx={{ width: 128, height: 128, p: 3, m: 4 }} 
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {dj.name}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {dj.genres.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {dj.bio}
      </Typography>
    </Box>
  );
}

export default DJProfile;
