import React, { useEffect } from 'react';
import { Box, Grid, Card, CardActionArea, Button, Typography, CircularProgress } from '@mui/material';
import DJProfile from '../djs/DJprofile';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDjs, selectDjData } from '../../redux/djSlice';

function DJProfilesPreview() {
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
      if (!DJs.length) {
        dispatch(fetchDjs());
      }
    }, [DJs, dispatch]);
    
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }

    return (
        <Box padding={2} className="dj-preview-section" >
            <Typography variant="h5" gutterBottom>Featured DJs</Typography>
            <Grid container spacing={3}>
                {DJs.filter(dj => isDJInfoValid(dj)).slice(0, 3).map(dj => (
                    <Grid item xs={12} sm={4} key={dj._id}>
                        <Card onClick={() => handleDJClick(dj._id)}> 
                            <CardActionArea>
                                <DJProfile dj={dj} />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="text" onClick={() => navigate('/alldjs')}>See All DJs</Button>
        </Box>
    );
}

export default React.memo(DJProfilesPreview);
