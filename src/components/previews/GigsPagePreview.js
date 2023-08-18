import React, { useEffect } from 'react';
import { Box, Typography, List, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGigs, selectGigsData } from '../../redux/gigsSlice';

export default function GigsPagePreview() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gigsList: djs, loading } = useSelector(selectGigsData);

    useEffect(() => {
      dispatch(fetchGigs());
    }, [dispatch]);

    if (loading) {
      return <Typography variant="h6" align="center">Loading...</Typography>;
    }

    if (!djs.length) {
      return <Typography variant="h6" align="center">No DJs or gigs available at the moment.</Typography>;
    }

    const topEvents = djs.flatMap(dj => dj.upcomingEvents).slice(0, 3);

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>Upcoming Gigs</Typography>
            <List>
                {topEvents.map((event) => (
                  <div key={event._id}>
                    <Typography variant="body1">{event.name} - {new Date(event.date).toLocaleDateString()}</Typography>
                  </div>
                ))}
            </List>
            <Button variant="text" onClick={() => navigate('/gigs')}>See All Gigs</Button>
        </Box>
    );
}
