import React, { useEffect } from 'react';
import { Box, Grid, Card, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DJProfile from './DJprofile';
import { CircularProgress } from '@mui/material';
import { fetchDjs, selectDjData } from '../../redux/djSlice';
function DJProfiles() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { djsList: DJs, loading } = useSelector(selectDjData);

  function isDJInfoValid(dj) {
    return dj && dj.name;
  }

  const handleDJClick = (djId) => {
    navigate(`/dj/${djId}`);
  };

  useEffect(() => {
    dispatch(fetchDjs());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <Grid container spacing={3}>
        {DJs.filter(dj => isDJInfoValid(dj))
            .map(dj => (
          <Grid item xs={12} sm={6} md={4} key={dj._id}>
            <Card onClick={() => handleDJClick(dj._id)} sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              fontSize: 'calc(7px + 2vmin)',
            }}> 
              <CardActionArea>
                <DJProfile dj={dj} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default React.memo(DJProfiles);
