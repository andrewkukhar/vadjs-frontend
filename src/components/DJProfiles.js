import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DJProfile from './DJprofile';

function DJProfiles() {
  const navigate = useNavigate();
  const [DJs, setDJs] = useState([]);
  async function fetchDJs() {
    try {
      const response = await fetch('https://vandjs-backend-api-b8d0ced4040e.herokuapp.com/users/djs'); 
      const data = await response.json();
      console.log("Fetched DJs:", data);
      return data;
    } catch (error) {
      console.error("Error fetching DJ data:", error);
      return [];
    }
  }

  function isDJInfoValid(djInfo) {
    if (!djInfo) return false; // Ensure djInfo is not null or undefined
    
    return Object.values(djInfo).every((value) => {
      // Check if the value is an array and if it's not empty
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      // Additional checks for other data types can be added here
      return true; // if not an array or any other data type you want to validate
    });
  }
  
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDJs();
      setDJs(data);
    }
    fetchData();
  }, []);
  const handleDJClick = (id) => {
    navigate(`/dj/${id}`);
  };

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
      {DJs.filter(({ djInfo }) => isDJInfoValid(djInfo))
          .map(({ djInfo, _id }) => (
        <Grid item xs={12} sm={6} md={4} key={_id}>
          <Card onClick={() => handleDJClick(_id)}> 
            <CardActionArea>
              <DJProfile dj={djInfo} />
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      </Grid>
    </Box>
  );
}

export default DJProfiles;
