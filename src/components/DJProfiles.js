import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DJProfile from './DJProfile';

function DJProfiles() {
  // This is just an example. Replace with data from your API or state
  const DJs = [
    { 
        id: 1, 
        name: 'DJ 1', 
        genres: ['house', 'techno'], 
        bio: 'Bio for DJ 1', 
        image: '/icons/djicon.png' 
    },
    { 
        id: 2, 
        name: 'DJ 2', 
        genres: ['rnb', 'top40'], 
        bio: 'Bio for DJ 2', 
        image: '/icons/djicon.png' 
    },
    { 
      id: 3, 
      name: 'DJ 3', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    { 
      id: 4, 
      name: 'DJ 4', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    { 
      id: 5, 
      name: 'DJ 5', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    { 
      id: 6, 
      name: 'DJ 6', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    { 
      id: 7, 
      name: 'DJ 7', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    { 
      id: 8, 
      name: 'DJ 8', 
      genres: ['rnb', 'top40'], 
      bio: 'Bio for DJ 2', 
      image: '/icons/djicon.png' 
    },
    // Add more DJs here...
  ];
  console.log(DJs)
  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {DJs.map((dj) => {
          console.log("Mapping DJ:", dj); // Add debug log here
          return (
            <Grid item xs={12} sm={6} md={4} key={dj.id}>
              <Link to={`/dj/${dj.id}`} style={{ textDecoration: 'none' }}>
                <DJProfile dj={dj} />
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DJProfiles;
