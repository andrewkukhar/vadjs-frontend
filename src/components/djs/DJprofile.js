import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

function DJProfile({ dj }) {
  if (!dj) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        fontSize: 'calc(10px + 2vmin)',
      }}
    >
      <Avatar 
        alt={dj?.name} 
        src={dj?.image} 
        sx={{ width: 'calc(50px + 2vmin)', height: 'calc(50px + 2vmin)', p: 3, m: 3 }} 
      />
      <Typography variant="h4" component="h1" gutterBottom fontSize="calc(10px + 2vmin)">
        {dj?.name}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom fontSize="calc(15px + 1vmin)">
        {dj?.genres.join(', ')}
      </Typography>
      <Typography variant="body1" gutterBottom fontSize="calc(10px + 1vmin)">
        {dj?.bio}
      </Typography>
    </Box>
  );
}

export default DJProfile;
