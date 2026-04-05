import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import PromptCard from './PromptCard';

const PromptShowcase = ({ trendingPrompts: prompts }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal shift
  // Moving -100% ensures that the right edge of the entire track (which is at least 100vw)
  // reaches the left edge of the screen.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  if (!prompts || prompts.length === 0) return null;

  // Dynamically calculate track height
  // 100vh for the sticky view + proportional height for moving cards
  const trackHeight = 100 + (prompts.length * 50); 

  return (
    <section 
      ref={targetRef} 
      className="showcase-scroll-track" 
      style={{ height: `${trackHeight}vh` }}
    >
      <div className="showcase-sticky-outer">
        <motion.div 
          style={{ x, minWidth: '100vw' }} 
          className="showcase-horizontal-inner"
        >
          {prompts.map((prompt) => (
            <div key={prompt._id} className="showcase-card-wrapper">
              <PromptCard prompt={prompt} />
            </div>
          ))}
          {/* Small fixed buffer so the last card doesn't touch the edge exactly */}
          <div style={{ minWidth: '5vw' }}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromptShowcase;
