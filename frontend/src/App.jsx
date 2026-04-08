import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { Toaster } from 'react-hot-toast';

import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      <AnimatePresence mode="wait">
        {showIntro && (
          <Preloader onFinish={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <div className="app-wrapper">
        <motion.div 
          className="hero-wrapper"
          initial={{ y: -200 }}
          animate={{ y: showIntro ? -200 : 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 15,
            delay: 0.2
          }}
        >
          <nav className="navbar">
            <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
              <motion.div 
                className="brand"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>〰</span> Prompt Galaxy
              </motion.div>
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
        </motion.div>
        
        <main className="container">
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} isIntroDone={!showIntro} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="footer">
          MADE WITH ❤️ BY KRISH
        </footer>

        <Analytics />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
