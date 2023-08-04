import React from 'react';
import { useParams, Link, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, useMediaQuery, Grid, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DJProfileDetails from './DJProfileDetails';
import AppPages from './AppPages';
import DJs from '../data/djData';
import Signup from './Signup';
import Login from './Login';

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const DJProfileComponent = () => {
    const { id } = useParams();
    const dj = DJs.find((dj) => dj.id === parseInt(id));
    return <DJProfileDetails dj={dj}/>;
  };

  const renderList = () => (
    <List>
      {AppPages.map(({ path: pagePath, name, Icon }) => (
        <ListItem button key={pagePath} component={Link} to={pagePath}>
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  );

  const renderIconGrid = () => (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      {AppPages.map(({ path: pagePath, name, Icon }) => (
        <Grid item key={pagePath}>
          <Tooltip title={name}>
            <IconButton component={Link} to={pagePath}>
              <Icon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <Box display="flex" flex="1" overflow="auto">
        <Box 
          width="calc(15% + 2vmin)" 
          bgcolor="darkgrey" 
          p={2} 
          position="sticky" 
          top={0}
          pt="calc(30px + 5vmin)"
          overflow="auto"
        >
          {matches ? renderIconGrid() : renderList()}
        </Box>
        <Box 
          width="calc(85% - 2vmin)" 
          bgcolor="white" 
          p={2}
          pt="calc(25px + 5vmin)"
          pb="calc(150px + 15vmin)"
          overflow="auto"
        >
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {AppPages.map(({ path: pagePath, Component }) => (
              <Route key={pagePath} path={pagePath} element={<Component />} />
            ))}
            <Route path="/dj/:id" element={<DJProfileComponent />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
