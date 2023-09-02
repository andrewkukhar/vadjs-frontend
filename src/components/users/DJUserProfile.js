import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as djService from '../../services/djService';
import { Button, Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setDjData, selectDjData } from '../../redux/djSlice';
import { CircularProgress } from '@mui/material';
import ProfileImageEditor from './ProfileImageEditor';
import UserProfileInfo from './UserProfileInfo';
import LinksEvents from './LinksEvents';

function UserProfile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { token, userId } = useContext(AuthContext);
  const djData = useSelector(selectDjData) || {};
  const [localData, setLocalData] = useState(djData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isImageEditMode, setIsImageEditMode] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    djService.fetchDjData(token, userId)
      .then(data => {
          dispatch(setDjData(data));
          setLocalData(data);
          setLoading(false);
      })
    .catch(error => {
      console.error('Error fetching DJ info:', error);
      setLoading(false);
    });
  }, [token, userId, dispatch]);

  const handleInputChange = (field, value) => {
    setLocalData(prev => {
      if (field.startsWith('socialMediaLinks.')) {
        const platform = field.split('.')[1];
        return {
          ...prev,
          socialMediaLinks: { ...prev.socialMediaLinks, [platform]: value }
        };
      } else if (field.startsWith('upcomingEvents.0.')) {
        const eventField = field.split('.')[2];
        const updatedEvents = JSON.parse(JSON.stringify(prev.upcomingEvents));
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
    
  const saveImageChanges = async () => {
    setSaving(true);
    try {
        const updatedDJ = await djService.updateUserProfileImage(token, userId, file);

        const updatedImage = {
            url: updatedDJ.image.url,
            public_id: updatedDJ.image.public_id
        };

        setLocalData(prevData => ({ ...prevData, image: updatedImage }));
        dispatch(setDjData({ ...djData, image: updatedImage }));
        setIsImageEditMode(false);
        setFile(null);
    } catch (error) {
        console.error("Error saving image:", error);
    } finally {
        setSaving(false);
    }
  };
  
  const saveUserDataChanges = async () => {
    setSaving(true);
    try {
      await djService.updateUserProfileData(token, userId, localData);
      dispatch(setDjData(localData));
      setIsEditMode(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
        setSaving(false);
    }
  };

  const cancelUserDataChanges = () => {
    setLocalData(djData);
    setIsEditMode(false);
  };

  const cancelImageChanges = () => {
    setIsImageEditMode(false);
    setFile(null);
  };

  function extractUsernameFromLink(link) {
    const parts = link.split('/');
    return parts[parts.length - 1] || parts[parts.length - 2];
  }  

  if (loading) {
    return <CircularProgress />;
  }
  
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
        <Grid item xs={12} md={6}>
          {/* <Grid item xs={12} sx={{ p: '1rem' }}>
              {!isEditMode ? (
                  <Button onClick={() => setIsEditMode(true)}>Edit</Button>
              ) : (
                  <>
                      <Button onClick={saveUserDataChanges}>Save</Button>
                      <Button onClick={cancelUserDataChanges} color="secondary">Cancel</Button>
                  </>
              )}
          </Grid> */}
        </Grid>
        <Grid container spacing={3}>
            {saving ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                  <Grid item xs={12} sx={{ p: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                      {!isEditMode ? (
                          <Button onClick={() => setIsEditMode(true)}>Edit Profile Info</Button>
                      ) : (
                          <>
                              <Button onClick={saveUserDataChanges}>Save</Button>
                              <Button onClick={cancelUserDataChanges} color="secondary">Cancel</Button>
                          </>
                      )}
                  </Grid>
                  <ProfileImageEditor 
                      isImageEditMode={isImageEditMode}
                      localData={localData}
                      setFile={setFile}
                      saveImageChanges={saveImageChanges}
                      setIsImageEditMode={setIsImageEditMode}
                      cancelImageChanges={cancelImageChanges}
                  />
                  <UserProfileInfo
                      isEditMode={isEditMode}
                      localData={localData}
                      handleInputChange={handleInputChange}
                      handleGenresChange={handleGenresChange}
                  />
                  <LinksEvents
                      isEditMode={isEditMode}
                      localData={localData}
                      handleInputChange={handleInputChange}
                      extractUsernameFromLink={extractUsernameFromLink}
                  />
                </>
            )}
        </Grid>
    </Box>
  );
}

export default UserProfile;
