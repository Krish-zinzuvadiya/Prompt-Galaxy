import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptCard from '../components/PromptCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/prompts';

const Home = ({ searchTerm = '' }) => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await axios.get(API_URL);
        setPrompts(res.data);
      } catch (err) {
        console.error('Failed to fetch prompts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  return (
    <div className="home-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>PROMPTS</h1>
        <div style={{ background: '#FFE66D', border: '3px solid #000', padding: '0.5rem 1rem', fontWeight: 900, fontSize: '1.125rem', boxShadow: '2px 2px 0px 0px #000' }}>
          TOTAL : {prompts.length}
        </div>
      </div>
      
      <div className="filters-bar">
        {['ALL', 'PROFILE / AVATAR', 'SOCIAL MEDIA POST', 'WEDDING', 'INFOGRAPHIC', 'POSTER / FLYER', 'LOGO / BRANDING', 'PRODUCT / MOCKUP'].map(filter => (
          <button 
            key={filter}
            className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', fontWeight: 900, fontSize: '2rem' }}>
          LOADING...
        </div>
      ) : (
        <div className="masonry-grid">
          {prompts.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'ALL' || p.promptType === activeFilter;
            return matchesSearch && matchesFilter;
          }).map((prompt) => (
            <div key={prompt._id} className="masonry-item">
              <PromptCard prompt={prompt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
