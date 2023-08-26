import React from 'react';
import { TextField, Grid, Select, MenuItem } from '@mui/material';
import genresData from '../../data/genres';

export default function UserProfileInfo({ isEditMode, localData, handleInputChange, handleGenresChange }) {

  return (
      <Grid item xs={12} md={6}>
          <Grid item xs={12} sx={{ p: '1rem' }}>
              <label>Name:</label>
              {isEditMode ? (
                  <TextField 
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
                  <TextField 
                      multiline
                      rows={4}
                      sx={{ width: '100%' }}
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
                  <TextField
                      multiline
                      rows={4}
                      sx={{ width: '100%' }}
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
      </Grid>
  );
}
