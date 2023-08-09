import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { TextField, Button, Box, List, ListItem, Grid } from '@mui/material';
import EditableField from './EditableField'

function UserProfile() {
  const [djData, setDjData] = useState(null);
  const { token, userId, role } = useContext(AuthContext);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState({
    username: false,
    name: false,
    image: false,
    genres: {}
  });

  const handleInputChange = (field, event) => {
    if (field === 'image') {
      handleImageChange(event);
    } else {
      setEditData(prev => ({ ...prev, [field]: event.target.value }));
    }
  };
  
  const isValidUsername = (username) => {
    return username && username.trim() !== "";
  };

  const isValidName = (name) => {
    return name && name.trim() !== "";
  };

  const isValidImage = (imageUrl) => {
    return imageUrl && imageUrl.trim() !== "";
  };

  const addGenre = () => {
    const updatedGenres = [...(editData['djInfo.genres'] || djData?.djInfo.genres || []), ""];
    handleInputChange('djInfo.genres', updatedGenres);
  };
  
  const toggleEditMode = (field, index = null, isValid) => {
    if (field === "genres") {
      setIsEditing(prev => {
        const genres = { ...prev.genres, general: !prev.genres.general };
        if (isValid) {
          const updatedGenres = [...(editData['djInfo.genres'] || [])];
          setDjData(prevData => {
            const updatedData = { ...prevData };
            updatedData.djInfo.genres = updatedGenres;
            return updatedData;
          });        
        }
        return { ...prev, genres };
      });
    } else {
      const newValue = isValid ? editData[field] : djData.djInfo[field];
      setDjData(prev => ({ ...prev, djInfo: { ...prev.djInfo, [field]: newValue } }));
      setIsEditing(prev => ({ ...prev, [field]: !prev[field] }));
    }
  };
  
  const saveGenresToDB = (updatedGenres) => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/users/djs/${userId}/update`;
  
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ djInfo: { genres: updatedGenres } })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update genres');
      }
      return response.json();
    })  
    .then(data => {
      setDjData(prevData => ({
        ...prevData,
        djInfo: {
          ...prevData.djInfo,
          genres: updatedGenres,
        }
      }));
      setIsEditing(prev => ({ ...prev, genres: { general: false } }));
    })
    .catch(error => console.error('Error updating genres:', error));
  };
  
  const updateFieldInDB = (field, value) => {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/users/djs/${userId}/update`;
  
    let body;
    if (field === 'name' || field === 'image') {
      body = {
        djInfo: {
          [field]: value
        }
      };
    } else {
      body = {
        [field]: value
      };
    }
    
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update field');
      }
      return response.json();
    })
    .then(data => {
      setDjData(prevData => ({
        ...prevData,
        djInfo: {
          ...prevData.djInfo,
          [field]: value
        }
      }));
      toggleEditMode(field);
    })
    .catch(error => console.error('Error updating field:', error));
  }

  function sendToServer(base64String) {
    let endpoint = `${process.env.REACT_APP_BACKEND_URL}/users/djs/${userId}/update`;
    fetch(endpoint, {
        method: 'PUT',
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: base64String })
    })
    .then(response => response.json())
    .then(data => {
      setDjData(prev => ({
        ...prev,
        djInfo: {
            ...prev.djInfo,
            image: base64String
        }
        }));
        setEditData(prev => ({
            ...prev,
            image: base64String
        }));
    });
  }
  
  function handleImageChange(event) {
    const file = event.target.files[0];
    
    const reader = new FileReader();
    reader.onloadend = () => {
        // reader.result contains the base64 encoded image.
        const base64String = reader.result;
        // Now you can send this to your server.
        sendToServer(base64String);
    };
    reader.readAsDataURL(file);
  }

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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 'calc(5px + 1vmin)',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <EditableField
              djData={djData}
              label="Image"
              value={editData.image || djData?.djInfo?.image || ''}
              isEditing={isEditing.image}
              onChange={(e) => handleInputChange('image', e)}
              toggleEdit={(editMode, validator) => {
                if (validator && validator(editData.image)) {
                  updateFieldInDB('image', editData.image);
                } else {
                  toggleEditMode('image', isValidImage(editData.image));
                }
              }}
              validator={isValidImage}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12}>
            <EditableField
              label="Username"
              value={editData.username || djData?.username}
              isEditing={isEditing.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              toggleEdit={(editMode, validator) => {
                if (validator && validator(editData.username)) {
                  updateFieldInDB('username', editData.username);
                } else {
                  toggleEditMode('username', isValidUsername(editData.username));
                }
              }}
              validator={isValidUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <EditableField
              label="Name"
              value={editData.name || djData?.djInfo?.name || ''}
              isEditing={isEditing.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              toggleEdit={(editMode, validator) => {
                if (validator && validator(editData.name)) {
                  updateFieldInDB('name', editData.name);
                } else {
                  toggleEditMode('name', isValidName(editData.name));
                }
              }}
              validator={isValidName}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <List>
              {!isEditing.genres.general ? (
                <ListItem sx={{ padding: '0 0', margin: '10 0' }}>
                  <span>
                    {djData?.djInfo?.genres && djData.djInfo.genres.length > 0
                      ? djData.djInfo.genres.join(', ')
                      : 'No genres available.'}
                  </span>
                  <Button onClick={() => setIsEditing(prev => ({ ...prev, genres: { general: true } }))}>Edit</Button>
                </ListItem>
              ) : null}
              {isEditing.genres.general ? (
                (editData['djInfo.genres'] || djData?.djInfo.genres || ['']).map((genre, index) => (
                  <ListItem  sx={{ padding: '10 0', margin: '10 0' }} key={index}>
                    <TextField 
                      label={`Genre ${index + 1}`}
                      value={genre}
                      onChange={(e) => {
                        const updatedGenres = [...(editData['djInfo.genres'] || djData?.djInfo.genres || [])];
                        updatedGenres[index] = e.target.value;
                        handleInputChange('djInfo.genres', updatedGenres);
                      }}
                    />
                  </ListItem>
                ))
              ) : null}
              {isEditing.genres.general ? (
                <>
                  <ListItem sx={{ padding: '10 0', margin: '10 0' }}>
                    <Button size="small" onClick={addGenre}>
                      + Add Genre
                    </Button>
                  </ListItem>
                  <ListItem sx={{ padding: '10 0', margin: '10 0' }}>
                    <Button onClick={() => saveGenresToDB(editData['djInfo.genres'] || [])}>
                      Save All Genres
                    </Button>
                  </ListItem>
                </>
              ) : null}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
