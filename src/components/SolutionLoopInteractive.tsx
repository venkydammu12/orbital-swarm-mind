import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Float } from '@react-three/drei';
import { 
  Search, 
  Navigation, 
  Package, 
  Recycle, 
  Battery, 
  RotateCcw,
  X,
  Play,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import anime from 'animejs';

interface LoopStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  technologies: string[];
  demo: React.ReactNode;
}

// 3D Demo Components
const DetectionDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-cyan-400/30 overflow-hidden">
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      
      {/* Scanning radar effect */}
      <Float speed={2} rotationIntensity={1}>
        <Box args={[0.2, 0.2, 0.2]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#00E6FF" emissive="#00E6FF" emissiveIntensity={0.3} />
        </Box>
      </Float>
      
      {/* Detected debris */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.5}>
          <Sphere 
            args={[0.05]} 
            position={[
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4,
              (Math.random() - 0.5) * 4
            ]}
          >
            <meshStandardMaterial color="#FF4444" emissive="#FF4444" emissiveIntensity={0.4} />
          </Sphere>
        </Float>
      ))}
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
    </Canvas>
    
    <div className="absolute bottom-2 left-2 text-xs text-cyan-400 font-mono">
      SCANNING... 5 OBJECTS DETECTED
    </div>
  </div>
);

const CollectionDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-orange-400/30 overflow-hidden">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      
      {/* Robot arm */}
      <Float speed={1} rotationIntensity={0.3}>
        <Box args={[0.1, 0.5, 0.1]} position={[-1, 0, 0]}>
          <meshStandardMaterial color="#00E6FF" />
        </Box>
      </Float>
      
      {/* Target debris */}
      <Float speed={0.5} rotationIntensity={0.8}>
        <Sphere args={[0.1]} position={[1, 0, 0]}>
          <meshStandardMaterial color="#FFB86B" emissive="#FFB86B" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    
    <div className="absolute bottom-2 left-2 text-xs text-orange-400 font-mono">
      CAPTURING... ARM EXTENDED
    </div>
  </div>
);

const RecyclingDemo = () => (
  <div className="relative w-full h-48 bg-black rounded-lg border border-green-400/30 overflow-hidden">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      
      {/* Processing chamber */}
      <Float speed={1} rotationIntensity={0.2}>
        <Box args={[1, 0.6, 0.8]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#90EE90" emissive="#90EE90" emissiveIntensity={0.2} />
        </Box>
      </Float>
      
      {/* Material output */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Float key={i} speed={2 + i} rotationIntensity={1}>
          <Sphere 
            args={[0.05]} 
            position={[0.5 + i * 0.2, -0.5, 0]}
          >
            <meshStandardMaterial color="#90EE90" />
          </Sphere>
        </Float>
      ))}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    
    <div className="absolute bottom-2 left-2 text-xs text-green-400 font-mono">
      PROCESSING... 85% EFFICIENCY
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
    description: 'Advanced AI systems scan orbital space to identify and track debris objects using multi-sensor arrays including LiDAR, cameras, and radar systems.',
    technologies: ['Computer Vision', 'LiDAR Sensors', 'Machine Learning', 'Radar Systems'],
    demo: <DetectionDemo />
  },
  {
    id: 'plan',
    title: 'PLAN',
    subtitle: 'Path Optimization',
    icon: <Navigation className="w-8 h-8" />,
    color: '#FFB86B',
    description: 'AI algorithms calculate optimal trajectories considering fuel efficiency, safety constraints, and mission priorities.',
    technologies: ['Path Planning', 'A* Algorithm', 'Collision Avoidance', 'Fuel Optimization'],
    demo: <div className="w-full h-48 bg-black rounded-lg border border-orange-400/30 flex items-center justify-center">
      <div className="text-orange-400 text-center">
        <Navigation className="h-12 w-12 mx-auto mb-2 animate-pulse" />
        <div className="text-xs font-mono">CALCULATING OPTIMAL PATH...</div>
      </div>
    </div>
  },
  {
    id: 'collect',
    title: 'COLLECT',
    subtitle: 'Robotic Capture',
    icon: <Package className="w-8 h-8" />,
    color: '#90EE90',
    description: 'Precision robotic arms and capture mechanisms safely secure debris without creating additional fragments.',
    technologies: ['Robotic Arms', 'Soft Grippers', 'Force Feedback', 'Precision Control'],
    demo: <CollectionDemo />
  },
  {
    id: 'recycle',
    title: 'RECYCLE',
    subtitle: 'Material Processing',
    icon: <Recycle className="w-8 h-8" />,
    color: '#DDA0DD',
    description: 'Advanced recycling processes transform debris into valuable materials for space construction and future missions.',
    technologies: ['3D Printing', 'Material Analysis', 'Thermal Processing', 'Quality Control'],
    demo: <RecyclingDemo />
  },
  {
    id: 'recharge',
    title: 'RECHARGE',
    subtitle: 'Solar Power Renewal',
    icon: <Battery className="w-8 h-8" />,
    color: '#F0E68C',
    description: 'Solar arrays provide sustainable power for continuous operation, enabling long-duration autonomous missions.',
    technologies: ['Solar Panels', 'Battery Management', 'Power Optimization', 'Energy Storage'],
    demo: <div className="w-full h-48 bg-black rounded-lg border border-yellow-400/30 flex items-center justify-center">
      <div className="text-yellow-400 text-center">
        <Battery className="h-12 w-12 mx-auto mb-2 animate-pulse" />
        <div className="text-xs font-mono">SOLAR CHARGING... 92%</div>
      </div>
    </div>
  },
  {
    id: 'repeat',
    title: 'REPEAT',
    subtitle: 'Continuous Cycle',
    icon: <RotateCcw className="w-8 h-8" />,
    color: '#FF69B4',
    description: 'The autonomous system continues the cycle, creating a self-sustaining orbital cleanup operation.',
    technologies: ['Automation', 'Mission Planning', 'Fleet Management', 'Continuous Monitoring'],
    demo: <div className="w-full h-48 bg-black rounded-lg border border-pink-400/30 flex items-center justify-center">
      <div className="text-pink-400 text-center">
        <RotateCcw className="h-12 w-12 mx-auto mb-2 animate-spin" />
        <div className="text-xs font-mono">CYCLE COMPLETE. RESTARTING...</div>
      </div>
    </div>
  }
];

const SolutionLoopInteractive = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedStepData = selectedStep ? loopSteps.find(step => step.id === selectedStep) : null;

  // Auto-advance through steps when playing
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loopSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Animate step transitions
  useEffect(() => {
    anime({
      targets: '.loop-step',
      scale: [0.9, 1],
      opacity: [0.7, 1],
      duration: 500,
      easing: 'easeOutElastic(1, .6)',
      delay: anime.stagger(100)
    });
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-orange-400 bg-clip-text text-transparent">
            AUTONOMOUS CLEANUP LOOP
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Continuous, self-sustaining space debris removal process powered by AI swarm intelligence.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-cyan-400 text-black hover:bg-cyan-500"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'} Animation
            </Button>
          </div>
        </motion.div>

        {/* Interactive Loop */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-orange-400 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <RotateCcw className="h-8 w-8 text-black" />
            </motion.div>
          </div>

          {/* Loop Steps */}
          <div className="relative w-96 h-96 mx-auto">
            {loopSteps.map((step, index) => {
              const angle = (index / loopSteps.length) * 360 - 90;
              const radius = 150;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              
              const isActive = index === currentStep;
              const isSelected = selectedStep === step.id;

              return (
                <motion.div
                  key={step.id}
                  className="loop-step absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: isActive ? 1.2 : 1,
                    boxShadow: isActive ? `0 0 30px ${step.color}80` : `0 0 10px ${step.color}40`
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => setSelectedStep(step.id)}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Step Circle */}
                    <div 
                      className="w-20 h-20 rounded-full border-2 bg-black/90 flex items-center justify-center relative overflow-hidden"
                      style={{ borderColor: step.color }}
                    >
                      <motion.div
                        style={{ color: step.color }}
                        animate={{ rotate: step.id === 'repeat' ? 360 : 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        {step.icon}
                      </motion.div>
                      
                      {/* Pulse effect for active step */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: step.color }}
                          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-center min-w-max">
                      <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-400">{step.subtitle}</p>
                      
                      {/* Click indicator */}
                      <div className="flex items-center justify-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-cyan-400">Click to explore</span>
                        <ArrowRight className="h-3 w-3 ml-1 text-cyan-400" />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {loopSteps.map((_, index) => {
              const angle1 = (index / loopSteps.length) * 360 - 90;
              const angle2 = ((index + 1) / loopSteps.length) * 360 - 90;
              const radius = 150;
              
              const x1 = 192 + Math.cos((angle1 * Math.PI) / 180) * radius;
              const y1 = 192 + Math.sin((angle1 * Math.PI) / 180) * radius;
              const x2 = 192 + Math.cos((angle2 * Math.PI) / 180) * radius;
              const y2 = 192 + Math.sin((angle2 * Math.PI) / 180) * radius;

              return (
                <motion.line
                  key={`line-${index}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="#00E6FF"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.6"
                  animate={{
                    strokeDashoffset: [0, -10]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })}
          </svg>
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
                className="bg-gray-900 border border-cyan-400/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: selectedStepData.color, color: selectedStepData.color }}
                    >
                      {selectedStepData.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold" style={{ color: selectedStepData.color }}>
                        {selectedStepData.title}
                      </h2>
                      <p className="text-gray-400">{selectedStepData.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStep(null)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-cyan-400">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedStepData.description}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-cyan-400">Technologies</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStepData.technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-lg text-sm"
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Demo */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-cyan-400">Live Demo</h3>
                    {selectedStepData.demo}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="text-center mt-16">
          <div className="flex justify-center gap-2 mb-4">
            {loopSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep ? 'bg-cyan-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            {isPlaying ? 'Auto-advancing through mission steps' : 'Click any step to explore details'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionLoopInteractive;