import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/auth/Navbar';
import Home from './components/pages/AppLayout';
import Footer from './components/pages/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Box sx={{ height: 'calc(5px + 1vmin)'}}>
            <Navbar />
          </Box>
          <Box flex="1" overflow="auto"
            sx={{
              minHeight: '100%',
              height: '100% - calc(5px + 1vmin)'
            }}
          >
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </Provider>
  );
}


export default App;
