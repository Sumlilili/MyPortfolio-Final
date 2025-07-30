import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRouter from './MainRouter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        <MainRouter />
      </Router>
    </div>
  );
}

export default App;
