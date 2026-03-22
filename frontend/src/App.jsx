import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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

            <div className="search-container">
              <input 
                type="text" 
                placeholder="SEARCH PROMPTS..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
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

        <Analytics />
      </div>
    </Router>
  );
}

export default App;
