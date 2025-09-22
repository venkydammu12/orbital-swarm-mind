import React, { useEffect, useRef } from 'react';
import * as anime from 'animejs';
import { motion } from 'framer-motion';

interface FuturisticCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowEffect?: boolean;
  borderAnimation?: boolean;
}

const FuturisticCard: React.FC<FuturisticCardProps> = ({
  children,
  className = "",
  delay = 0,
  glowEffect = false,
  borderAnimation = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current && borderAnimation) {
      // Animate border glow
      anime({
        targets: cardRef.current,
        boxShadow: [
          '0 0 20px hsl(var(--accent) / 0.2)',
          '0 0 40px hsl(var(--accent) / 0.4)',
          '0 0 20px hsl(var(--accent) / 0.2)'
        ],
        duration: 3000,
        easing: 'easeInOutSine',
        loop: true,
        delay: delay
      });
    }
  }, [borderAnimation, delay]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: delay / 1000
      }}
      className={`
        holographic rounded-xl p-6 
        ${glowEffect ? 'animate-neon-pulse' : ''} 
        ${borderAnimation ? 'border-neon' : ''}
        transition-bounce hover:scale-105
        ${className}
      `}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 40px hsl(var(--accent) / 0.4)"
      }}
    >
      {children}
    </motion.div>
  );
};

export default FuturisticCard;