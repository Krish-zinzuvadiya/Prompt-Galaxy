import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onFinish }) => {
  const [stage, setStage] = useState('red');

  useEffect(() => {
    // Stage 1: Red background with glitch
    const t1 = setTimeout(() => setStage('yellow'), 1000);
    // Stage 2: Yellow background with splash
    const t2 = setTimeout(() => onFinish(), 2000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <motion.div 
      className={`preloader-bg ${stage}`}
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1] } 
      }}
    >
      <AnimatePresence mode="wait">
        {stage === 'red' ? (
          <motion.div
            key="red-text"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="glitch-text"
            data-text="PROMPT GALAXY"
          >
            PROMPT GALAXY
          </motion.div>
        ) : (
          <motion.div
            key="yellow-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glitch-text"
            style={{ color: '#000' }}
            data-text="READY?"
          >
            READY?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          translateX: '-50%',
          fontWeight: 900,
          letterSpacing: '0.5em',
          fontSize: '0.8rem'
        }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        INITIALIZING...
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
