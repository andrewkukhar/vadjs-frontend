import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { TextField, Button, Box, List, ListItem, Grid } from '@mui/material';

function UserProfile() {
  const [djData, setDjData] = useState(null);
  const { token, userId, role } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState({
    username: false,
    name: false,
    image: false,
    genres: {} // This will track edit mode for each genre separately.
  });
  const toggleEditMode = (field, index) => {
    if (typeof index !== 'undefined') {
      setIsEditing(prevState => ({
        ...prevState,
        genres: { ...prevState.genres, [index]: !prevState.genres[index] }
      }));
    } else {
      setIsEditing(prevState => ({ ...prevState, [field]: !prevState[field] }));
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/djs/${userId}`, {
      headers: {
        'x-auth-token': token
      }      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch DJ info');
      }
      return response.json();
    })
    .then(data => setDjData(data))
    .catch(error => console.error('Error fetching DJ info:', error));
  }, [token, userId, role]);

  const isValidUsername = (username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(username) && username.length > 2;
  };
  
  const isValidName = (name) => {
    return name.trim().length > 0;
  };
  
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };
  
  const updateField = (field, value) => {
    let valid = true;
  
    if (field === "username" && !isValidUsername(value)) {
      valid = false;
    }
    
    if (field === "djInfo.name" && !isValidName(value)) {
      valid = false;
    }

    if (field === "djInfo.image" && !isValidURL(value)) {
      valid = false;
    }

    if (!valid) return;

    const updatedInfo = { ...djData };
    updatedInfo[field] = value;
    setDjData(updatedInfo);
    
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/djs/${userId}/update`, {
      method: 'PUT',
      headers: {
        'x-auth-token': token
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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        p: 'calc(5px + 1vmin)',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {
            isEditing.username ? (
              <>
                <TextField 
                  label="Username"
                  variant="outlined" 
                  value={djData?.username || ''}
                  onChange={(e) => updateField('username', e.target.value)}
                />
                <Button onClick={() => toggleEditMode('username')}>Save</Button>
              </>
            ) : (
              <>
                <span>{djData?.username || 'No username available.'}</span>
                <Button onClick={() => toggleEditMode('username')}>Edit</Button>
              </>
            )
          }
        </Grid>
        <Grid item xs={12}>
          {
            isEditing.name ? (
              <>
                <TextField 
                  label="Name" 
                  variant="outlined" 
                  value={djData?.djInfo?.name || ''} 
                  onChange={(e) => updateField('djInfo.name', e.target.value)}
                />
                <Button onClick={() => toggleEditMode('name')}>Save</Button>
              </>
            ) : (
              <>
                <span>{djData?.djInfo?.name || 'No name available.'}</span>
                <Button onClick={() => toggleEditMode('name')}>Edit</Button>
              </>
            )
          }
        </Grid>
        <Grid item xs={12}>
          <List>
            {((djData?.djInfo?.genres && djData.djInfo.genres.length > 0) ? djData.djInfo.genres : [null]).map((genre, index) => (
              <ListItem key={index}>
                {isEditing.genres[index] ? (
                  <>
                    <TextField 
                      label="Genre"
                      value={genre || ''}
                      onChange={(e) => {
                        const updatedGenres = [...(djData?.djInfo.genres || [])];
                        updatedGenres[index] = e.target.value;
                        updateField('djInfo.genres', updatedGenres);
                      }}
                    />
                    <Button onClick={() => toggleEditMode('genres', index)}>Save</Button>
                  </>
                ) : (
                  <>
                    <span>{genre || 'No genre available.'}</span>
                    <Button onClick={() => toggleEditMode('genres', index)}>Edit</Button>
                  </>
                )}
              </ListItem>
            ))}
          </List>
          <Button onClick={() => {
            const newGenre = '';
            const updatedGenres = [...(djData?.djInfo.genres || []), newGenre];
            updateField('djInfo.genres', updatedGenres);
          }}>
            Add Genre
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          {
            isEditing.image ? (
              <>
                <TextField 
                  label="Image" 
                  variant="outlined" 
                  value={djData?.djInfo?.image || ''} 
                  onChange={(e) => updateField('djInfo.image', e.target.value)}
                />
                <Button onClick={() => toggleEditMode('image')}>Save</Button>
              </>
            ) : (
              <>
                <img src={djData?.djInfo?.image || 'default-image-link'} alt="DJ" style={{ maxWidth: '100%', height: 'auto' }} />
                <Button onClick={() => toggleEditMode('image')}>Edit</Button>
              </>
            )
          }
        </Grid>

      </Grid>
    </Box>
  );
}

export default UserProfile;
