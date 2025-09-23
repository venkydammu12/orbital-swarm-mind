import React from 'react';

const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle particles - minimal and elegant */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20 animate-pulse"
          style={{
            width: Math.random() * 2 + 0.5 + 'px',
            height: Math.random() * 2 + 0.5 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 4 + 's',
            animationDuration: (Math.random() * 6 + 4) + 's'
          }}
        />
      ))}
      
      {/* Moving particles with cyan accent */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-0.5 h-0.5 bg-accent/30 rounded-full animate-float"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 8 + 's',
            animationDuration: (Math.random() * 12 + 8) + 's'
          }}
        />
      ))}
      
      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-transparent" />
    </div>
  );
};

export default SpaceBackground;