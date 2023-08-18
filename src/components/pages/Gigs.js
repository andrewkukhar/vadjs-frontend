import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';
import { fetchAllDjUpcomingEvents } from '../../services/djService';

export default function GigsPage() {
  const [djs, setDJs] = useState([]);
  
  useEffect(() => {
    const getDJs = async () => {
      try {
        const fetchedDJs = await fetchAllDjUpcomingEvents();
        setDJs(fetchedDJs);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    
    getDJs();
  }, []);

  if (!djs.length) {
    return <Typography variant="h6" align="center">No DJs or gigs available at the moment.</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>All Gigs</Typography>
      <List>
        {djs.map((dj) => (
          <div key={dj._id}>
            <ListItem>
              <Box flex={1}>
                <Typography variant="h6">{dj.name}</Typography>
                <Typography variant="subtitle1" gutterBottom>Upcoming Events:</Typography>
                {dj.upcomingEvents.map(event => (
                  <div key={event._id}>
                    <Typography variant="body1">{event.name} - {new Date(event.date).toLocaleDateString()}</Typography>
                  </div>
                ))}
              </Box>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </Box>
  );
}
