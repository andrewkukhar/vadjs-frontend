import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import Signup from './Signup';
import Login from './Login';
import AppPages from './AppPages';

function Home({setToken}) {
  return (
    <Box display="flex">
      <Box width="calc(20% + 2vmin)" height="100vh" bgcolor="lightgrey" p={2}>
        <List>
          {AppPages.map(({ path: pagePath, name }) => (
            <ListItem button key={pagePath} component={Link} to={pagePath}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box width="calc(80% + 2vmin)" height="100vh" bgcolor="lightblue" p={2}>
        <Routes>
          <Route path="/signup" element={<Signup setToken={setToken} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {AppPages.map(({ path: pagePath, Component }) => (
            <Route key={pagePath} path={pagePath} element={<Component />} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default Home;
