import React from 'react';
import { Box } from '@mui/system';

function Home() {
  return (
    <Box display="flex">
      <Box width="calc(20% + 2vmin)" height="100vw" bgcolor="lightgrey" p={2}>
        <h2>Sidebar</h2>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
          <li>Link 4</li>
        </ul>
      </Box>
      <Box width="calc(80% + 2vmin)" height="100vw" bgcolor="lightblue" p={2}>
        <h1>Welcome to our site!</h1>
        <p>This is some public info available to all visitors.</p>
      </Box>
    </Box>
  );
}

export default Home;
