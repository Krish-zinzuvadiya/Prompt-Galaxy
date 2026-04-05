import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import PromptCard from './PromptCard';

const PromptShowcase = ({ trendingPrompts: prompts }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal shift
  // Moving -110% ensures every card and the end buffer clear the left side
  const x = useTransform(scrollYProgress, [0, 1], ["20vw", "-110%"]);

  if (!prompts || prompts.length === 0) return null;

  // Dynamically calculate track height based on prompt count for consistent scroll speed
  const trackHeight = Math.max(300, prompts.length * 40); // e.g. 10 prompts = 400vh

  return (
    <section 
      ref={targetRef} 
      className="showcase-scroll-track" 
      style={{ height: `${trackHeight}vh` }}
    >
      <div className="showcase-sticky-outer">
        <motion.div style={{ x }} className="showcase-horizontal-inner">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="showcase-card-wrapper">
              <PromptCard prompt={prompt} />
            </div>
          ))}
          {/* Large buffer at the end to ensure the last card fully exits the frame */}
          <div style={{ minWidth: '100vw' }}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromptShowcase;
