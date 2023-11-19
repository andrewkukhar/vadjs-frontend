import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./components/pages/AppLayout";
import "./App.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
