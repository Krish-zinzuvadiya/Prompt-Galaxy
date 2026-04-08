import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptCard from '../components/PromptCard';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/prompts';
const Home = ({ searchTerm = '', isIntroDone = false }) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="home-page">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroDone ? 1 : 0 }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}
      >
        <div className="animated-title-container">
          {"PROMPTS".split("").map((letter, index) => (
            <motion.span
              key={index}
              className="title-letter floating"
              initial={{ y: 100, opacity: 0, rotate: -20 }}
              animate={isIntroDone ? { y: 0, opacity: 1, rotate: index % 2 === 0 ? -3 : 3 } : {}}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 10,
                delay: 0.8 + (index * 0.1) 
              }}
              whileHover={{ 
                scale: 1.3, 
                zIndex: 100, 
                rotate: 0,
                transition: { duration: 0.1 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={isIntroDone ? { scale: 1 } : {}}
          transition={{ type: 'spring', delay: 1.5 }}
          style={{ background: '#FFE66D', border: '4px solid #000', padding: '0.75rem 1.5rem', fontWeight: 900, fontSize: '1.25rem', boxShadow: '4px 4px 0px 0px #000' }}
        >
          TOTAL : {prompts.length}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="filters-bar"
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroDone ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      >
        {['ALL', 'PROFILE / AVATAR', 'SOCIAL MEDIA POST', 'WEDDING', 'INFOGRAPHIC', 'POSTER / FLYER', 'LOGO / BRANDING', 'PRODUCT / MOCKUP'].map(filter => (
          <button 
            key={filter}
            className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', fontWeight: 900, fontSize: '2rem' }}>
          LOADING...
        </div>
      ) : (
        <motion.div 
          className="masonry-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isIntroDone ? "visible" : "hidden"}
        >
          {prompts.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = activeFilter === 'ALL' || p.promptType === activeFilter;
            return matchesSearch && matchesFilter;
          }).sort((a, b) => {
            if (activeFilter === 'ALL') {
              return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
            }
            return 0;
          }).map((prompt) => (
            <motion.div 
              key={prompt._id} 
              className="masonry-item"
              variants={itemVariants}
            >
              <PromptCard prompt={prompt} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Home;
