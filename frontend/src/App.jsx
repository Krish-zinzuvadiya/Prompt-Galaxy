import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Router>
      <div className="app-wrapper">
        <div className="hero-wrapper">
          <nav className="navbar">
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <div className="brand">
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>〰</span> Prompt Galaxy
              </div>
            </Link>

            <div className="search-container" style={{ flex: 1, margin: '0 2rem', maxWidth: '500px' }}>
              <input 
                type="text" 
                placeholder="SEARCH PROMPTS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '3px solid #000',
                  boxShadow: '2px 2px 0px 0px #000',
                  fontFamily: 'inherit',
                  fontWeight: 900,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'transform 0.1s, box-shadow 0.1s'
                }}
                onFocus={(e) => { e.target.style.transform = 'translate(-2px, -2px)'; e.target.style.boxShadow = '4px 4px 0px 0px #000'; }}
                onBlur={(e) => { e.target.style.transform = 'translate(0px, 0px)'; e.target.style.boxShadow = '2px 2px 0px 0px #000'; }}
              />
            </div>
            <div className="nav-buttons">
              <Link to="/" className="brutal-btn primary">Prompts</Link>
            </div>
          </nav>
        </div>
        
        <main className="container">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="footer">
          MADE WITH ❤️ BY KRISH
        </footer>
      </div>
    </Router>
  );
}

export default App;
