import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import anime from 'animejs';
import { 
  Search, 
  Navigation, 
  Package, 
  Recycle, 
  Battery, 
  RotateCcw,
  ArrowRight,
  X,
  Play,
  Radar,
  Target,
  Factory,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LoopStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  technologies: string[];
  process: string[];
  demo: React.ReactNode;
}

// Demo Components with Three.js-like animations
const DetectionDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-cyan-400/30 overflow-hidden">
    <div className="absolute inset-0">
      {/* Scanning radar effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-cyan-400/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Detected objects */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-400 rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Robot scanner */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          boxShadow: [
            '0 0 10px #00E6FF',
            '0 0 30px #00E6FF',
            '0 0 10px #00E6FF'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-cyan-400 font-mono">
      LIDAR SCANNING... 6 OBJECTS DETECTED
    </div>
  </div>
);

const PlanningDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-orange-400/30 overflow-hidden">
    <div className="absolute inset-0">
      {/* Path calculation visualization */}
      <svg className="w-full h-full">
        <motion.path
          d="M 20 120 Q 100 40 180 120"
          stroke="#00E6FF"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 20 120 Q 100 160 180 120"
          stroke="#FFB86B"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </svg>
      
      {/* Start and end points */}
      <div className="absolute top-1/2 left-5 w-3 h-3 bg-cyan-400 rounded-full transform -translate-y-1/2" />
      <div className="absolute top-1/2 right-5 w-3 h-3 bg-red-400 rounded-full transform -translate-y-1/2" />
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-orange-400 font-mono">
      CALCULATING OPTIMAL PATHS...
    </div>
  </div>
);

const CollectionDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-green-400/30 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Robot arm animation */}
      <motion.div
        className="relative"
        animate={{ rotate: [0, 45, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-16 h-2 bg-cyan-400 rounded" />
        <motion.div
          className="absolute right-0 top-0 w-4 h-4 bg-green-400 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Target debris */}
      <motion.div
        className="absolute top-1/2 right-1/4 w-3 h-3 bg-red-400 rounded-sm transform -translate-y-1/2"
        animate={{ 
          x: [0, -50, -50],
          opacity: [1, 1, 0]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-green-400 font-mono">
      ROBOTIC ARM CAPTURING...
    </div>
  </div>
);

const ProcessingDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-purple-400/30 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Processing chamber */}
      <motion.div
        className="w-20 h-12 border-2 border-purple-400 rounded-lg relative"
        animate={{
          borderColor: ['#A855F7', '#FFB86B', '#00E6FF', '#A855F7']
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {/* Material input */}
        <motion.div
          className="absolute -left-8 top-1/2 w-4 h-2 bg-red-400 rounded transform -translate-y-1/2"
          animate={{ x: [0, 32, 32], opacity: [1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Material output */}
        <motion.div
          className="absolute -right-8 top-1/2 w-4 h-2 bg-green-400 rounded transform -translate-y-1/2"
          animate={{ x: [0, 16], opacity: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-purple-400 font-mono">
      RECYCLING... 85% EFFICIENCY
    </div>
  </div>
);

const RechargeDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-yellow-400/30 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Solar panels */}
      <motion.div
        className="w-16 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded"
        animate={{
          boxShadow: [
            '0 0 10px #FFB86B',
            '0 0 30px #FFB86B',
            '0 0 10px #FFB86B'
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Energy flow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-8 bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-yellow-400 font-mono">
      SOLAR CHARGING... 92% COMPLETE
    </div>
  </div>
);

const RepeatDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-cyan-400/30 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-24 h-24 border-4 border-cyan-400 rounded-full relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
    
    <div className="absolute bottom-2 left-2 text-xs text-cyan-400 font-mono">
      AUTONOMOUS CYCLE ACTIVE...
    </div>
  </div>
);

const loopSteps: LoopStep[] = [
  {
    id: 'detect',
    title: 'DETECT',
    subtitle: 'AI-Powered Detection',
    icon: <Search className="w-8 h-8" />,
    color: '#00E6FF',
    description: 'Advanced AI systems scan orbital space using LiDAR, radar, and computer vision to identify and classify space debris in real-time.',
    technologies: ['Computer Vision', 'LiDAR Sensors', 'Machine Learning', 'Radar Systems', 'OpenCV', 'TensorFlow'],
    process: [
      'Long-range orbital scanning with radar arrays',
      'Object detection using computer vision AI',
      'Debris classification and threat assessment',
      'Real-time tracking and trajectory prediction'
    ],
    demo: <DetectionDemo />
  },
  {
    id: 'plan',
    title: 'PLAN',
    subtitle: 'Path Optimization',
    icon: <Navigation className="w-8 h-8" />,
    color: '#FFB86B',
    description: 'AI algorithms calculate optimal trajectories considering fuel efficiency, safety constraints, collision avoidance, and mission priorities.',
    technologies: ['Path Planning', 'A* Algorithm', 'Collision Avoidance', 'Fuel Optimization', 'ROS2', 'Python'],
    process: [
      'Shortest path calculation using A* algorithm',
      'Safest route planning with collision avoidance',
      'Fuel efficiency optimization analysis',
      'Mission priority and risk assessment'
    ],
    demo: <PlanningDemo />
  },
  {
    id: 'collect',
    title: 'COLLECT',
    subtitle: 'Robotic Capture',
    icon: <Package className="w-8 h-8" />,
    color: '#90EE90',
    description: 'Precision robotic systems deploy specialized capture mechanisms based on debris type: magnetic for metal, vacuum for plastic, grasping arms for others.',
    technologies: ['Robotic Arms', 'Magnetic Capture', 'Vacuum Systems', 'Force Feedback', 'Precision Control', 'ROS2'],
    process: [
      'Debris type identification and sensor selection',
      'Approach trajectory execution with precision control',
      'Deployment of appropriate capture mechanism',
      'Secure containment and damage prevention'
    ],
    demo: <CollectionDemo />
  },
  {
    id: 'process',
    title: 'PROCESS',
    subtitle: 'Material Recycling',
    icon: <Recycle className="w-8 h-8" />,
    color: '#DDA0DD',
    description: 'Advanced recycling processes at the Mother Station transform collected debris into valuable materials for space construction and future missions.',
    technologies: ['3D Printing', 'Material Analysis', 'Thermal Processing', 'Quality Control', 'Automated Manufacturing'],
    process: [
      'Material composition analysis and sorting',
      'Thermal breakdown and purification processes',
      'New component manufacturing with 3D printing',
      'Quality assurance and certification testing'
    ],
    demo: <ProcessingDemo />
  },
  {
    id: 'recharge',
    title: 'RECHARGE',
    subtitle: 'Solar Power Renewal',
    icon: <Battery className="w-8 h-8" />,
    color: '#F0E68C',
    description: 'Solar arrays provide sustainable power for continuous operation, enabling long-duration autonomous missions with minimal ground support.',
    technologies: ['Solar Panels', 'Battery Management', 'Power Optimization', 'Energy Storage', 'MPPT Controllers'],
    process: [
      'Solar energy collection and conversion',
      'Battery charging with optimal power management',
      'Energy distribution across all robot systems',
      'Power efficiency monitoring and optimization'
    ],
    demo: <RechargeDemo />
  },
  {
    id: 'repeat',
    title: 'REPEAT',
    subtitle: 'Continuous Cycle',
    icon: <RotateCcw className="w-8 h-8" />,
    color: '#FF69B4',
    description: 'The autonomous system continues the cycle indefinitely, creating a self-sustaining orbital cleanup operation that requires minimal human intervention.',
    technologies: ['Automation', 'Mission Planning', 'Fleet Management', 'Continuous Monitoring', 'AI Coordination'],
    process: [
      'Mission cycle completion assessment',
      'Performance optimization and learning',
      'System self-diagnostics and maintenance',
      'Next target identification and cycle restart'
    ],
    demo: <RepeatDemo />
  }
];

const SolutionLoop = () => {
  const loopRef = useRef<HTMLDivElement>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedStepData = selectedStep ? loopSteps.find(step => step.id === selectedStep) : null;

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

  // Auto-advance through steps when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loopSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = (step: typeof loopSteps[0]) => {
    setSelectedStep(step.id);
    
    // Animate click effect
    anime({
      targets: `#step-${step.id}`,
      scale: [1, 1.1, 1],
      duration: 300,
      easing: 'easeOutElastic(1, .6)'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-20" ref={loopRef}>
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent"
        >
          AUTONOMOUS CLEANUP LOOP
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
        >
          Continuous, self-sustaining space debris removal process powered by AI swarm intelligence
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-cyan-400 text-black hover:bg-cyan-500 font-bold"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'} Animation
          </Button>
        </motion.div>
      </div>

      {/* Circular Loop Layout */}
      <div className="relative w-full h-[600px] mx-auto">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
          {/* Background circle */}
          <circle
            cx="300"
            cy="300"
            r="200"
            fill="none"
            stroke="rgba(0, 230, 255, 0.2)"
            strokeWidth="2"
          />
          
          {/* Connecting lines between steps */}
          {loopSteps.map((_, index) => {
            const angle1 = (index * 60 - 90) * (Math.PI / 180);
            const angle2 = ((index + 1) * 60 - 90) * (Math.PI / 180);
            const radius = 200;
            
            const x1 = 300 + radius * Math.cos(angle1);
            const y1 = 300 + radius * Math.sin(angle1);
            const x2 = 300 + radius * Math.cos(angle2);
            const y2 = 300 + radius * Math.sin(angle2);

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
          {loopSteps.map((_, index) => {
            const angle = (index * 60 - 90) * (Math.PI / 180);
            const x = 300 + 200 * Math.cos(angle);
            const y = 300 + 200 * Math.sin(angle);
            
            return (
              <motion.circle
                key={`flow-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#00E6FF"
                animate={{
                  r: [3, 6, 3],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            );
          })}
        </svg>

        {/* Step nodes */}
        {loopSteps.map((step, index) => {
          const angle = (index * 60 - 90) * (Math.PI / 180);
          const x = 300 + 200 * Math.cos(angle);
          const y = 300 + 200 * Math.sin(angle);
          
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          
          return (
            <div
              key={step.id}
              id={`step-${step.id}`}
              className="loop-step absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${(x / 600) * 100}%`,
                top: `${(y / 600) * 100}%`
              }}
              onClick={() => handleStepClick(step)}
            >
              {/* Step container */}
              <div className="relative">
                {/* Glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`,
                    transform: 'scale(2.5)'
                  }}
                  animate={isActive ? {
                    scale: [2, 3, 2],
                    opacity: [0.3, 0.6, 0.3]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Main step circle */}
                <motion.div 
                  className="relative w-24 h-24 rounded-full border-3 bg-black/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ borderColor: step.color }}
                  animate={isActive ? {
                    scale: [1, 1.2, 1],
                    borderColor: [step.color, '#FFFFFF', step.color]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    style={{ color: step.color }}
                    animate={step.id === 'repeat' ? { rotate: 360 } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.div>
                
                {/* Step info */}
                <div className="absolute top-28 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{step.subtitle}</p>
                  
                  {/* Click indicator */}
                  <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-cyan-400">Click to explore</span>
                    <ArrowRight className="h-3 w-3 ml-1 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center logo/title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div 
            className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400 flex items-center justify-center mb-3 active-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <RotateCcw className="h-10 w-10 text-black" />
          </motion.div>
          <div className="text-lg font-bold text-cyan-400">AI SWARM</div>
          <div className="text-sm text-gray-400">CLEANUP LOOP</div>
        </div>
      </div>

      {/* Step Detail Modal */}
      <AnimatePresence>
        {selectedStepData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedStep(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 border border-cyan-400/30 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <div 
                    className="w-20 h-20 rounded-full border-3 flex items-center justify-center"
                    style={{ borderColor: selectedStepData.color, color: selectedStepData.color }}
                  >
                    {selectedStepData.icon}
                  </div>
                  <div>
                    <h2 className="text-5xl font-bold" style={{ color: selectedStepData.color }}>
                      {selectedStepData.title}
                    </h2>
                    <p className="text-gray-400 text-xl">{selectedStepData.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStep(null)}
                  className="p-3 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-8 h-8 text-gray-400" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Description</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{selectedStepData.description}</p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Technologies</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedStepData.technologies.map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Process Steps</h3>
                    <div className="space-y-3">
                      {selectedStepData.process.map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-4"
                        >
                          <div 
                            className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1"
                            style={{ borderColor: selectedStepData.color, color: selectedStepData.color }}
                          >
                            {index + 1}
                          </div>
                          <p className="text-gray-300 leading-relaxed">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Demo */}
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-cyan-400">Live Demo</h3>
                  {selectedStepData.demo}
                  
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                    <h4 className="text-cyan-400 font-bold text-sm mb-2">TECHNICAL IMPLEMENTATION</h4>
                    <div className="text-xs text-gray-300 space-y-1">
                      <div>• Real-time processing with edge computing</div>
                      <div>• Fault-tolerant distributed systems</div>
                      <div>• Machine learning model optimization</div>
                      <div>• Hardware-software integration</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="text-center mt-16">
        <div className="flex justify-center gap-3 mb-6">
          {loopSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                index === currentStep ? 'bg-cyan-400 scale-125' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setCurrentStep(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
        <p className="text-gray-400 text-lg">
          {isPlaying ? 'Auto-advancing through mission steps' : 'Click any step to explore details'}
        </p>
      </div>
    </div>
  );
};

export default SolutionLoop;