import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as djService from '../../services/djService';
import { TextField, Button, Box, Grid, Select, MenuItem, TextareaAutosize, Input } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setDjData, selectDjData } from '../../redux/djSlice';
import genresData from '../../data/genres';
import dayjs from 'dayjs';

function UserProfile() {
  const dispatch = useDispatch();
  const { token, userId } = useContext(AuthContext);
  const djData = useSelector(selectDjData) || {};
  const [localData, setLocalData] = useState(djData);
  const [isEditMode, setIsEditMode] = useState(false);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  useEffect(() => {
    if (!userId) return;
    djService.fetchDjData(token, userId)
      .then(data => {
          dispatch(setDjData(data));
          setLocalData(data);
      })
      .catch(error => console.error('Error fetching DJ info:', error));
  }, [token, userId, dispatch]);

  const handleInputChange = (field, value) => {
    setLocalData(prev => {
      if (field === 'image' && value) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLocalData(prev => ({ ...prev, [field]: e.target.result }));
        };
        reader.readAsDataURL(value);
        return prev; 
      } else if (field.startsWith('socialMediaLinks.')) {
        const platform = field.split('.')[1];
        return {
          ...prev, 
          socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value }
        };
      } else if (field.startsWith('upcomingEvents.0.')) {
        const eventField = field.split('.')[2];
        const updatedEvents = JSON.parse(JSON.stringify(prev.upcomingEvents)); // Deep copying the array
        if (!updatedEvents[0]) {
          updatedEvents[0] = {};
        }
        updatedEvents[0][eventField] = value;
        return { ...prev, upcomingEvents: updatedEvents };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const handleGenresChange = (event) => {
    setLocalData(prev => ({ ...prev, genres: event.target.value }));
  };
    
  const handleSaveChange = async (field) => {
    const dataToSend = { ...localData };
    if (dataToSend.image && dataToSend.image.startsWith('data:')) {
      dataToSend.image = dataToSend.image.split(",")[1];
    }
    
    try {
      await djService.updateUserProfile(token, userId, dataToSend);
      dispatch(setDjData(dataToSend));
    } catch (error) {
      console.error(`Error updating ${field || 'profile'}:`, error);
    }
  };
  
  const saveAllChanges = async () => {
    try {
      await handleSaveChange();
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving all changes:", error);
    }
  };

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
                <Grid item xs={12} sx={{ display: 'flex', p: '1rem', flexDirection: 'column' }}>
                    <label>Profile Image:</label>
                    {isEditMode ? (
                        <input 
                            type="file"
                            onChange={(e) => handleInputChange('image', e.target.files[0])}
                        />
                    ) : (
                        <img src={localData?.image || 'default-image-path.jpg'} alt="User Profile" width={100} />
                    )}
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item xs={12} sx={{ p: '1rem' }}>
                    <label>Name:</label>
                    {isEditMode ? (
                        <TextField 
                            label="Name"
                            sx={{ width: '100%' }}
                            value={localData?.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    ) : (
                        <div>{localData?.name || 'N/A'}</div>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ p: '1rem' }}>
                    <label>Genres:</label>
                    {isEditMode ? (
                        <Select
                            multiple
                            sx={{ width: '100%' }}
                            value={localData?.genres || []}
                            onChange={handleGenresChange}
                        >
                            {genresData?.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <div>{localData?.genres?.join(', ') || 'N/A'}</div>
                    )}
                </Grid>
                <Grid item xs={12} sx={{ p: '1rem' }}>
                <label>Short Bio:</label>
                {isEditMode ? (
                    <TextareaAutosize 
                        value={localData?.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                    />
                ) : (
                    <div>{localData?.bio || 'N/A'}</div>
                )}
            </Grid>

            <Grid item xs={12} sx={{ p: '1rem' }}>
                <label>Full Bio:</label>
                {isEditMode ? (
                    <TextareaAutosize 
                        value={localData?.fullBio || ''}
                        onChange={(e) => handleInputChange('fullBio', e.target.value)}
                    />
                ) : (
                    <div>{localData?.fullBio || 'N/A'}</div>
                )}
            </Grid>

            <Grid item xs={12} sx={{ p: '1rem' }}>
                <label>Years Active:</label>
                {isEditMode ? (
                    <TextField 
                        value={localData?.yearsActive || ''}
                        onChange={(e) => handleInputChange('yearsActive', e.target.value)}
                    />
                ) : (
                    <div>{localData?.yearsActive || 'N/A'}</div>
                )}
            </Grid>
            <Grid item xs={12} sx={{ p: '1rem' }}>
                <label>Twitter Link:</label>
                {isEditMode ? (
                  <Input 
                    value={localData?.socialMediaLinks?.twitter || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.twitter', e.target.value)}
                  />
                ) : (
                    <div>{localData?.socialMediaLinks?.twitter || 'N/A'}</div>
                )}
            </Grid>
            <Grid item xs={12} sx={{ p: '1rem' }}>
                <label>Facebook Link:</label>
                {isEditMode ? (
                    <Input 
                        value={localData?.socialMediaLinks?.get('facebook') || ''}
                        onChange={(e) => handleInputChange('socialMediaLinks.facebook', e.target.value)}
                    />
                ) : (
                    <div>{localData?.socialMediaLinks?.facebook || 'N/A'}</div>
                )}
            </Grid>
            <Grid item xs={12} sx={{ p: '1rem' }}>
              <label>First Upcoming Event Name:</label>
              {isEditMode ? (
                  <TextField 
                      value={localData?.upcomingEvents?.[0]?.name || ''}
                      onChange={(e) => handleInputChange('upcomingEvents.0.name', e.target.value)}
                  />
              ) : (
                  <div>{localData?.upcomingEvents?.[0]?.name || 'N/A'}</div>
              )}
            </Grid>
            <Grid item xs={12} sx={{ p: '1rem' }}>
              <label>First Upcoming Event Date:</label>
              {isEditMode ? (
                <input
                  type="date"
                  value={dayjs(localData?.upcomingEvents?.[0]?.date).format('YYYY-MM-DD')}
                  onChange={(e) => handleInputChange('upcomingEvents.0.date', e.target.value)}
                />
              ) : (
                  <div>{formatDate(localData?.upcomingEvents?.[0]?.date) || 'N/A'}</div>
              )}
            </Grid>
            <Grid item xs={12} sx={{ p: '1rem' }}>
                {!isEditMode ? (
                    <Button onClick={() => setIsEditMode(true)}>Edit</Button>
                ) : (
                    <Button onClick={saveAllChanges}>Save</Button>
                )}
            </Grid>
            </Grid>
        </Grid>
    </Box>
  );
}

export default UserProfile;
