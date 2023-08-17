import React from 'react';
import { Box, Typography, Avatar, List, ListItem, Link as MuiLink } from '@mui/material';

function DJProfileDetails({ dj }) {
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
        alt={dj.name || 'DJ'}
        src={dj.image || ''} 
        sx={{ width: 128, height: 128, p: 3, m: 3 }} 
      />
      <Typography variant="h4" component="h1" gutterBottom>
        {dj.name}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        {dj.genres && Array.isArray(dj?.genres) ? dj.genres.join(', ') : ''}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {dj.fullBio.length > 150 ? dj.fullBio.substring(0, 147) + "..." : dj.fullBio}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Years Active: {dj.yearsActive}
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom>
        Upcoming Events:
      </Typography>
      <List>
        {dj.upcomingEvents.map((event, index) => (
          <ListItem key={index}>
            {event.name} on {event.date}
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" component="h3" gutterBottom>
        Follow me on:
      </Typography>
      <List>
        {Object.entries(dj.socialMediaLinks).map(([platform, url]) => (
          <ListItem key={platform}>
            <MuiLink href={url} target="_blank" rel="noopener noreferrer">
              {platform}
            </MuiLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DJProfileDetails;
