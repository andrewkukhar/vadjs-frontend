import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { TextField, Button, Box, List, ListItem } from '@mui/material';

function UserProfile({ userType }) {
  const [djInfo, setDjInfo] = useState(null);
  const { token, userId } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) return;
    fetch(`https://vandjs-backend-api-b8d0ced4040e.herokuapp.com/users/djs/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch DJ info');
      }
      return response.json();
    })
    .then(data => setDjInfo(data))
    .catch(error => console.error('Error fetching DJ info:', error));
  }, [token, userId]);

  const updateField = (field, value) => {
    const updatedInfo = { ...djInfo };
    updatedInfo[field] = value;
    setDjInfo(updatedInfo);
    
    fetch(`https://vandjs-backend-api-b8d0ced4040e.herokuapp.com/users/djs/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ [field]: value })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update field');
      }
      return response.json();
    })
    .then(data => {
      // Handle success - Maybe show a toast or message here
    })
    .catch(error => console.error('Error updating field:', error));
  };

  if (!djInfo) return <div>Loading...</div>;

  return (
    <Box>
      <TextField 
        label="Name" 
        variant="outlined" 
        value={djInfo.name || ''} 
        onChange={(e) => updateField('name', e.target.value)}
      />
      {/* Add more fields similarly... */}
      
      <List>
        {djInfo.genres.map((genre, index) => (
          <ListItem key={index}>
            <TextField 
              value={genre} 
              onChange={(e) => {
                const updatedGenres = [...djInfo.genres];
                updatedGenres[index] = e.target.value;
                updateField('genres', updatedGenres);
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Button onClick={() => {
        const newGenre = 'NewGenre';  // or any default value
        const updatedGenres = [...djInfo.genres, newGenre];
        updateField('genres', updatedGenres);
      }}>
        Add Genre
      </Button>
    </Box>
);

}

export default UserProfile;
