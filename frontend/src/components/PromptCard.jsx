import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/prompts';

const PromptCard = ({ prompt }) => {
  const [hasViewed, setHasViewed] = useState(false);

  const handleMouseEnter = async () => {
    if (!hasViewed) {
      setHasViewed(true);
      try {
        await axios.post(`${API_URL}/view/${prompt._id}`);
      } catch(err) {
        // ignore errors for passive view logging
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

      <div className="card-footer-btn" onClick={handleCopy} style={{ borderTop: '2px solid #000' }}>
        TRY IT NOW
      </div>
    </div>
  );
};

export default PromptCard;
