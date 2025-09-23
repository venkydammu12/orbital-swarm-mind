import React from 'react';
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
  return (
    <motion.div
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
        ${borderAnimation ? 'border-neon animate-pulse' : ''}
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