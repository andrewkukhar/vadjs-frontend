import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="*" element={<Home setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
