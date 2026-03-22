import React from 'react';

const PromptCard = ({ prompt }) => {
  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.content);
    
    const platformStr = prompt.platform.toLowerCase();
    if (platformStr.includes('chatgpt')) {
      // Passes the prompt to ChatGPT. ChatGPT will place it in the box for the user!
      window.open(`https://chatgpt.com/?q=${encodeURIComponent(prompt.content)}`, '_blank');
    } else if (platformStr.includes('gemini')) {
      alert('PROMPT COPIED! Gemini blocks direct pasting via link. Please press Ctrl+V to paste it manually!');
      window.open('https://gemini.google.com/app', '_blank');
    } else if (platformStr.includes('claude')) {
      window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt.content)}`, '_blank');
    } else if (platformStr.includes('midjourney')) {
      alert('PROMPT COPIED! Paste this in your Discord Midjourney bot.');
    } else {
      alert('PROMPT COPIED! Ready to paste into the platform.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options).toUpperCase();
  };

  return (
    <div className="prompt-card">
      <div className="featured-badge">{prompt.platform}</div>
      
      <div className="card-header">
        <span>BY @PROMPT_GALAXY</span>
        <span>{formatDate(prompt.createdAt || Date.now())}</span>
      </div>
      
      <h3 className="card-title">{prompt.title}</h3>
      
      <div className="card-image-wrap">
        <img src={prompt.imageUrl} alt={prompt.title} className="card-image" loading="lazy" />
      </div>
      
      <div className="card-content">
        {prompt.content}
      </div>

      <div className="card-footer-btn" onClick={handleCopy}>
        TRY IT NOW
      </div>
    </div>
  );
};

export default PromptCard;
