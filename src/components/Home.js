import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, useMediaQuery, Grid, Tooltip, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Signup from './Signup';
import Login from './Login';
import AppPages from './AppPages';

function Home() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Box display="flex">
      <Box width="calc(15% + 2vmin)" height="100vh" bgcolor="darkgrey" p={2}>
        {matches ? renderIconGrid() : renderList()}
      </Box>
      <Box width="calc(90% + 2vmin)" height="100vh" bgcolor="white" p={2}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {AppPages.map(({ path: pagePath, Component }) => (
            <Route key={pagePath} path={pagePath} element={<Component />} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default Home;
