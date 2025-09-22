import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 1000 
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Split text into individual characters
      const chars = text.split('').map((char, index) => 
        `<span class="inline-block" style="transform: translateY(50px); opacity: 0;">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      textRef.current.innerHTML = chars;
      
      // Animate characters one by one
      anime({
        targets: textRef.current.children,
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(30, { start: delay }),
        duration: duration,
        easing: 'spring(1, 80, 10, 0)'
      });
    }
  }, [text, delay, duration]);

  return <div ref={textRef} className={className} />;
};

export default AnimatedText;