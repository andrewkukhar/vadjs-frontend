import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import AppPages from './AppPages';

function Home() {
  return (
    <Box display="flex">
      <Box width="calc(20% + 2vmin)" height="100vw" bgcolor="lightgrey" p={2}>
        <List>
          {AppPages.map(({ path: pagePath, name }) => (
            <ListItem button key={pagePath} component={Link} to={pagePath}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box width="calc(80% + 2vmin)" height="100vw" bgcolor="lightblue" p={2}>
        <Routes>
          {AppPages.map(({ path: pagePath, Component }) => (
            <Route key={pagePath} path={pagePath} element={<Component />} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}

export default Home;
