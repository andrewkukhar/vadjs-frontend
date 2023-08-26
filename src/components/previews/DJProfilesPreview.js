import React, { useEffect } from 'react';
import { Box, Card, CardActionArea, Button, Typography, CircularProgress } from '@mui/material';
import DJProfile from '../djs/DJprofile';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDjs, selectDjData } from '../../redux/djSlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function DJProfilesPreview() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "20px",
      margin: '0 20px',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: "10px",
            margin: '0 20px',
          }
        },
        {
          breakpoint: 1024, 
          settings: {
            slidesToShow: 2,
            centerMode: true,
            centerPadding: "20px",
            margin: '0 20px',
          }
        }
      ]
    };
    
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
      <Box padding={2} className="dj-preview-section">
          <Typography variant="h5" gutterBottom>Featured DJs</Typography>
          {DJs && DJs.length > 0 ? (
              <Slider {...sliderSettings}>
                  {DJs.filter(dj => isDJInfoValid(dj)).map(dj => (
                      <div key={dj._id} style={{ border: '2px solid #e0e0e0', padding: '10px', borderRadius: '10px', margin: '0 10px' }}>
                          <Card onClick={() => handleDJClick(dj._id)}>
                              <CardActionArea>
                                  <DJProfile dj={dj} />
                              </CardActionArea>
                          </Card>
                      </div>
                  ))}
              </Slider>
          ) : (
              <Typography variant="body2">No DJs available at the moment.</Typography>
          )}
          <Button variant="text" onClick={() => navigate('/alldjs')}>See All DJs</Button>
      </Box>
  );
}

export default React.memo(DJProfilesPreview);
