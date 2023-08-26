import React from 'react';
import { TextField, Grid, Input, Link } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function LinksEvents({ isEditMode, localData, handleInputChange, extractUsernameFromLink }) {    
    function formatDate(dateString) {
        return dayjs.tz(dateString, 'America/Los_Angeles').utc().format('MM/DD/YY');
    }
        
  return (
      <Grid item xs={12} md={6}>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>Instagram Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.instagram || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.instagram', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.instagram ? (
                        <Link href={localData?.socialMediaLinks?.instagram} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.instagram)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div>
            )}
        </Grid>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>Facebook Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.facebook || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.facebook', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.facebook ? (
                        <Link href={localData?.socialMediaLinks?.facebook} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.facebook)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div>                    )}
        </Grid>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>SoundCloud Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.soundcloud || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.soundcloud', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.soundcloud ? (
                        <Link href={localData?.socialMediaLinks?.soundcloud} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.soundcloud)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div> 
            )}
        </Grid>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>YouTube Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.youtube || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.youtube', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.youtube ? (
                        <Link href={localData?.socialMediaLinks?.youtube} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.youtube)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div> 
            )}
        </Grid>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>Beatport Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.beatport || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.beatport', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.beatport ? (
                        <Link href={localData?.socialMediaLinks?.beatport} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.beatport)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div> 
            )}
        </Grid>
        <Grid item xs={12} sx={{ p: '1rem' }}>
            <label>MixCloud Link:</label>
            {isEditMode ? (
                <Input 
                    value={localData?.socialMediaLinks?.mixcloud || ''}
                    onChange={(e) => handleInputChange('socialMediaLinks.mixcloud', e.target.value)}
                />
            ) : (
                <div>
                    {localData?.socialMediaLinks?.mixcloud ? (
                        <Link href={localData?.socialMediaLinks?.mixcloud} target="_blank" rel="noopener noreferrer" variant="body1">
                            {extractUsernameFromLink(localData?.socialMediaLinks?.mixcloud)}
                        </Link>
                    ) : (
                        'N/A'
                    )}
                </div> 
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
                    value={formatDate(localData?.upcomingEvents?.[0]?.date)}
                    onChange={(e) => handleInputChange('upcomingEvents.0.date', formatDate(e.target.value))}
                />
            ) : (
                <div>{formatDate(localData?.upcomingEvents?.[0]?.date) || 'N/A'}</div>
            )}
        </Grid>
      </Grid>
  );
}
