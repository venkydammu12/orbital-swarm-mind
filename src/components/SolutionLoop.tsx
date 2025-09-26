import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs';
import { 
  Search, 
  Navigation, 
  Package, 
  Recycle, 
  Battery, 
  RotateCcw,
  ArrowRight 
} from 'lucide-react';

const SolutionLoop = () => {
  const loopRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const steps = [
    {
      id: 'detect',
      icon: Search,
      title: 'Detect',
      description: 'AI vision identifies space debris using LiDAR and cameras',
      color: '#00E6FF',
      route: '/features/detection'
    },
    {
      id: 'plan',
      icon: Navigation,
      title: 'Plan',
      description: 'Calculate optimal safe path to target debris',
      color: '#FFB86B',
      route: '/features/coordination'
    },
    {
      id: 'collect',
      icon: Package,
      title: 'Collect',
      description: 'Robotic arms capture and secure debris safely',
      color: '#90EE90',
      route: '/features/capture'
    },
    {
      id: 'recycle',
      icon: Recycle,
      title: 'Recycle',
      description: 'Process materials for reuse in space construction',
      color: '#DDA0DD',
      route: '/features/recycling'
    },
    {
      id: 'recharge',
      icon: Battery,
      title: 'Recharge',
      description: 'Solar panels restore energy at mothership',
      color: '#F0E68C',
      route: '/features/storage'
    },
    {
      id: 'repeat',
      icon: RotateCcw,
      title: 'Repeat',
      description: 'Continuous autonomous cleanup cycle',
      color: '#FF69B4',
      route: '/features/monitoring'
    }
  ];

  useEffect(() => {
    // Animate loop entrance
    anime({
      targets: '.loop-step',
      scale: [0, 1],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 800,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animate connecting lines
    anime({
      targets: '.connecting-line',
      strokeDashoffset: [anime.setDashoffset, 0],
      delay: 1000,
      duration: 2000,
      easing: 'easeInOutSine'
    });

    // Continuous glow animation for active step
    anime({
      targets: '.active-glow',
      boxShadow: [
        '0 0 20px rgba(0, 230, 255, 0.3)',
        '0 0 40px rgba(0, 230, 255, 0.6)',
        '0 0 20px rgba(0, 230, 255, 0.3)'
      ],
      duration: 2000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  const handleStepClick = (step: typeof steps[0]) => {
    // Animate click effect
    anime({
      targets: `#step-${step.id}`,
      scale: [1, 1.1, 1],
      duration: 300,
      easing: 'easeOutElastic(1, .6)'
    });

    // Navigate after animation
    setTimeout(() => {
      navigate(step.route);
    }, 300);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-20" ref={loopRef}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-foreground bg-clip-text text-transparent">
          Autonomous Cleanup Loop
        </h2>
        <p className="text-xl text-muted-foreground">
          Continuous, self-sustaining space debris removal process
        </p>
      </div>

      {/* Circular Loop Layout */}
      <div className="relative w-full h-96 mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          {/* Background circle */}
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            opacity="0.3"
          />
          
          {/* Connecting lines between steps */}
          {steps.map((_, index) => {
            const angle1 = (index * 60 - 90) * (Math.PI / 180);
            const angle2 = ((index + 1) * 60 - 90) * (Math.PI / 180);
            const radius = 140;
            
            const x1 = 200 + radius * Math.cos(angle1);
            const y1 = 200 + radius * Math.sin(angle1);
            const x2 = 200 + radius * Math.cos(angle2);
            const y2 = 200 + radius * Math.sin(angle2);

            return (
              <path
                key={`line-${index}`}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                fill="none"
                stroke="#00E6FF"
                strokeWidth="3"
                strokeDasharray="10,5"
                className="connecting-line"
                opacity="0.6"
              />
            );
          })}
          
          {/* Animated flow indicators */}
          {steps.map((_, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const x = 200 + 140 * Math.cos(angle);
            const y = 200 + 140 * Math.sin(angle);
            
            return (
              <circle
                key={`flow-${index}`}
                cx={x}
                cy={y}
                r="3"
                fill="#00E6FF"
                className="animate-pulse-glow"
              />
            );
          })}
        </svg>

        {/* Step nodes */}
        {steps.map((step, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const x = 200 + 140 * Math.cos(angle);
          const y = 200 + 140 * Math.sin(angle);
          
          const IconComponent = step.icon;
          
          return (
            <div
              key={step.id}
              id={`step-${step.id}`}
              className="loop-step absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${(x / 400) * 100}%`,
                top: `${(y / 400) * 100}%`
              }}
              onClick={() => handleStepClick(step)}
            >
              {/* Step container */}
              <div className="relative">
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`,
                    transform: 'scale(2)'
                  }}
                />
                
                {/* Main step circle */}
                <div 
                  className="relative w-20 h-20 rounded-full border-2 bg-card/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ borderColor: step.color }}
                >
                  <IconComponent 
                    className="h-8 w-8" 
                    style={{ color: step.color }}
                  />
                </div>
                
                {/* Step info */}
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground max-w-40 mx-auto leading-tight">
                    {step.description}
                  </p>
                  
                  {/* Click indicator */}
                  <div className="flex items-center justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-accent">Click to explore</span>
                    <ArrowRight className="h-3 w-3 ml-1 text-accent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center logo/title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-accent-foreground flex items-center justify-center mb-2 active-glow">
            <RotateCcw className="h-8 w-8 text-black animate-rotate-slow" />
          </div>
          <div className="text-sm font-semibold text-accent">AI SWARM</div>
          <div className="text-xs text-muted-foreground">LOOP</div>
        </div>
      </div>

      {/* Additional info */}
      <div className="text-center mt-16">
        <p className="text-muted-foreground">
          Click any step to explore the detailed process and technology
        </p>
      </div>
    </div>
  );
};

export default SolutionLoop;