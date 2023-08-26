import React from 'react';
import { Button, Grid } from '@mui/material';

export default function ProfileImageEditor({ isImageEditMode, localData, setFile, saveImageChanges, setIsImageEditMode, cancelImageChanges }) {
  return (
      <Grid item xs={12} md={6}>
          <Grid item xs={12} sx={{ display: 'flex', p: '1rem', flexDirection: 'column' }}>
              <label>Profile Image:</label>
              {isImageEditMode ? (
                  <>
                      <input 
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                      />
                  </>
              ) : (
                  <>
                      <img src={localData?.image?.url || '/icons/djicon.png'} alt="User Profile" width={100} />
                  </>
              )}
          </Grid>
          <Grid item xs={12} sx={{ p: '1rem' }}>
              {isImageEditMode ? (
                  <>
                      <Button onClick={saveImageChanges}>Save Image</Button>
                      <Button onClick={cancelImageChanges} color="secondary">Cancel</Button>
                  </>
              ) : (
                  <>
                      <Button onClick={() => setIsImageEditMode(true)}>Edit Image</Button>
                  </>
              )}
          </Grid>
      </Grid>
  );
}
