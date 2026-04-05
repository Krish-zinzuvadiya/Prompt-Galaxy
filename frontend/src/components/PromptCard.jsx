import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/prompts';

const PromptCard = ({ prompt }) => {
  const [hasRated, setHasRated] = useState(false);
  const [ratingVal, setRatingVal] = useState(() => {
    if (prompt.ratings && prompt.ratings.length > 0) {
      return (prompt.ratings.reduce((a, b) => a + b, 0) / prompt.ratings.length).toFixed(1);
    }
    return 0;
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);

  const handleRate = async (e, star) => {
    e.stopPropagation();
    if (hasRated) return;
    setHasRated(true);
    
    const currentSum = prompt.ratings ? prompt.ratings.reduce((a, b) => a + b, 0) : 0;
    const currentCount = prompt.ratings ? prompt.ratings.length : 0;
    const newAvg = ((currentSum + star) / (currentCount + 1)).toFixed(1);
    setRatingVal(newAvg);
    
    try {
      await axios.post(`${API_URL}/rating/${prompt._id}`, { rating: star });
      toast.success('RATED SUCCESSFULLY!');
    } catch(err) {
      toast.error('FAILED TO SUBMIT RATING');
    }
  };

  const handleMouseEnter = async () => {
    if (!hasViewed) {
      setHasViewed(true);
      try {
        await axios.post(`${API_URL}/view/${prompt._id}`);
      } catch(err) {
        // ignore errors
      }
    }
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    
    let displayAi = prompt.platform;
    if (!displayAi) {
      const ais = ["ChatGPT", "Gemini", "Claude"];
      displayAi = ais[Math.floor(Math.random() * ais.length)];
    }

    const platformStr = (prompt.platform || '').toLowerCase();
    let redirectUrl = '';
    
    if (platformStr.includes('chatgpt') || displayAi === 'ChatGPT') {
      redirectUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt.content)}`;
    } else if (platformStr.includes('gemini') || displayAi === 'Gemini') {
      redirectUrl = 'https://gemini.google.com/app';
    } else if (platformStr.includes('claude') || displayAi === 'Claude') {
      redirectUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt.content)}`;
    } else if (platformStr.includes('midjourney')) {
      redirectUrl = '';
    } else {
      redirectUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt.content)}`;
    }

    toast.custom(
      (t) => (
        <div className={`custom-toast ${t.visible ? 'animate-enter' : 'animate-leave'}`}>
          <div className="toast-message">Redirecting to {displayAi}...</div>
          <div className="toast-submessage">PROMPT COPIED TO CLIPBOARD!</div>
          <div className="toast-progress-bg">
            <div className="toast-progress-bar"></div>
          </div>
        </div>
      ),
      { duration: 1000 }
    );

    if (redirectUrl) {
      setTimeout(() => {
        window.open(redirectUrl, '_blank');
      }, 1000);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="prompt-card" onMouseEnter={handleMouseEnter} style={{ position: 'relative' }}>
      {prompt.isTrending && (
        <div className="trending-badge">
          🔥 TRENDING
        </div>
      )}
      <div className="platform-badge">{prompt.platform}</div>
      
      <div className="card-header">
        <span>BY @PROMPT_GALAXY</span>
        <span>{formatDate(prompt.createdAt || Date.now())}</span>
      </div>
      
      <h3 className="card-title">{prompt.title}</h3>
      
      <div className="card-image-wrap">
        <img
          src={prompt.imageUrl}
          alt={prompt.title}
          className="card-image"
          loading="lazy"
          style={{ objectPosition: `${prompt.imagePositionX ?? 50}% ${prompt.imagePositionY ?? 50}%` }}
        />
      </div>
      
      <div className="card-content">
        {prompt.content}
      </div>

      <div className="rating-container" style={{ padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFBEA', borderTop: '2px solid #000' }}>
        <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>
          {ratingVal > 0 ? `★ ${ratingVal}` : 'NO RATINGS YET'}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={(e) => handleRate(e, star)}
              onMouseEnter={() => !hasRated && setHoveredStar(star)}
              onMouseLeave={() => !hasRated && setHoveredStar(0)}
              style={{
                cursor: hasRated ? 'default' : 'pointer',
                color: (hoveredStar >= star || (!hoveredStar && Math.round(ratingVal) >= star)) ? '#FFB800' : '#CCC',
                fontSize: '1.5rem',
                lineHeight: 1,
                textShadow: '1px 1px 0px #000',
                transition: 'transform 0.1s',
                transform: hoveredStar === star && !hasRated ? 'scale(1.2)' : 'scale(1)'
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer-btn" onClick={handleCopy} style={{ borderTop: '2px solid #000' }}>
        TRY IT NOW
      </div>
    </div>
  );
};

export default PromptCard;
