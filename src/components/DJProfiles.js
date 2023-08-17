import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DJProfile from './DJprofile';

function DJProfiles() {
  const navigate = useNavigate();
  const [DJs, setDJs] = useState([]);
  
  async function fetchDJs() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/djs`); 
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching DJ data:", error);
      return [];
    }
  }

  function isDJInfoValid(dj) {
    return dj && dj.name;  // Return true if dj exists and has a name.
  }
    
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDJs();
      setDJs(data);
      console.log("Fetched DJs:", DJs);
    }
    fetchData();
  }, []);
  
  const handleDJClick = (id) => {
    navigate(`/dj/${id}`);
  };

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
      {DJs.filter(dj => isDJInfoValid(dj))
          .map(dj => (
        <Grid item xs={12} sm={6} md={4} key={dj._id}>
          <Card onClick={() => handleDJClick(dj._id)}> 
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
