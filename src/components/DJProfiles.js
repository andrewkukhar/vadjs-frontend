import React from 'react';
import { Box, Grid, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DJProfile from './DJprofile';
import DJs from '../data/djData';

function DJProfiles() {
  const navigate = useNavigate();

  const handleDJClick = (id) => {
    navigate(`/dj/${id}`);
  };

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {DJs.map((dj) => (
          <Grid item xs={12} sm={6} md={4} key={dj.id}>
            <Card onClick={() => handleDJClick(dj.id)}> 
              <CardActionArea>
                <DJProfile dj={dj} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default DJProfiles;
