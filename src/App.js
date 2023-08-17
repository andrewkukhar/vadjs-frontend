import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Navbar />
          <Box flex="1" overflow="auto" minHeight="100%">
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
