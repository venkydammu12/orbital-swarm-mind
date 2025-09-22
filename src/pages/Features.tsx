import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Radar, 
  Cpu, 
  Shield, 
  Target, 
  Satellite, 
  Network, 
  Zap,
  X 
} from 'lucide-react';

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('ai-algorithms');

  const features = [
    {
      id: 'ai-algorithms',
      title: 'AI Algorithms',
      icon: <Brain className="h-8 w-8" />,
      angle: 0,
      problem: 'Space debris cleanup requires intelligent decision-making and real-time adaptation.',
      solution: 'Advanced machine learning algorithms enable autonomous decision-making and swarm coordination.',
      technologies: ['Deep Learning', 'Reinforcement Learning', 'Computer Vision', 'Neural Networks'],
      demo: 'Real-time debris classification with 99.2% accuracy'
    },
    {
      id: 'detection',
      title: 'Debris Detection', 
      icon: <Radar className="h-8 w-8" />,
      angle: 45,
      problem: 'Space debris is difficult to detect and track in the vast emptiness of space.',
      solution: 'Multi-sensor fusion combining LIDAR, cameras, and radar for comprehensive detection.',
      technologies: ['LIDAR Systems', 'Computer Vision', 'Radar Technology', 'Sensor Fusion'],
      demo: 'Detects objects as small as 1cm from 10km distance'
    },
    {
      id: 'coordination',
      title: 'Swarm Coordination',
      icon: <Network className="h-8 w-8" />,
      angle: 90,
      problem: 'Multiple robots must work together efficiently without collisions.',
      solution: 'Distributed consensus algorithms ensure optimal task allocation and path planning.',
      technologies: ['Distributed Computing', 'Consensus Algorithms', 'Path Planning', 'Communication Protocols'],
      demo: 'Coordinates up to 50 robots simultaneously'
    },
    {
      id: 'processing',
      title: 'Edge Computing',
      icon: <Cpu className="h-8 w-8" />,
      angle: 135,
      problem: 'Space environments require real-time processing with limited communication.',
      solution: 'On-board edge computing enables autonomous operation with minimal latency.',
      technologies: ['Edge AI Chips', 'Real-time Processing', 'Embedded Systems', 'Optimization'],
      demo: 'Sub-millisecond decision making in space conditions'
    },
    {
      id: 'safety',
      title: 'Safety Systems',
      icon: <Shield className="h-8 w-8" />,
      angle: 180,
      problem: 'Space operations must prevent creating additional debris or damaging satellites.',
      solution: 'Fail-safe mechanisms and collision avoidance ensure safe operations.',
      technologies: ['Collision Avoidance', 'Fail-safe Systems', 'Emergency Protocols', 'Risk Assessment'],
      demo: 'Zero collision incidents in 10,000+ simulated operations'
    },
    {
      id: 'precision',
      title: 'Precision Control',
      icon: <Target className="h-8 w-8" />,
      angle: 225,
      problem: 'Capturing debris requires extremely precise robotic manipulation in zero gravity.',
      solution: 'Advanced robotic arms with haptic feedback and micro-adjustment capabilities.',
      technologies: ['Robotic Arms', 'Haptic Feedback', 'Precision Actuators', 'Zero-G Mechanics'],
      demo: 'Captures objects with ±0.1mm precision'
    },
    {
      id: 'communication',
      title: 'Space Communication',
      icon: <Satellite className="h-8 w-8" />,
      angle: 270,
      problem: 'Reliable communication is critical for coordinated space operations.',
      solution: 'Mesh network communication with redundant links and error correction.',
      technologies: ['Mesh Networks', 'Error Correction', 'Antenna Arrays', 'Signal Processing'],
      demo: '99.9% uptime with auto-healing network topology'
    },
    {
      id: 'power',
      title: 'Power Management',
      icon: <Zap className="h-8 w-8" />,
      angle: 315,
      problem: 'Space missions require efficient power usage and renewable energy sources.',
      solution: 'Advanced solar panels with intelligent power distribution and storage.',
      technologies: ['Solar Arrays', 'Power Distribution', 'Battery Management', 'Energy Optimization'],
      demo: '40% more efficient than traditional space power systems'
    }
  ];

  const selectedFeatureData = features.find(f => f.id === selectedFeature);

  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Interactive Feature Loop
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any feature around the central loop to explore the technology behind AI swarm robotics
          </p>
        </motion.div>

        <div className="relative flex items-center justify-center min-h-[600px]">
          {/* Central Loop */}
          <div className="relative w-96 h-96">
            {/* Rotating background circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-accent/20 animate-pulse-glow"
            />
            
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center shadow-glow"
              >
                <div className="text-primary-foreground font-bold text-sm text-center">
                  AI Swarm<br />Hub
                </div>
              </motion.div>
            </div>

            {/* Feature nodes */}
            {features.map((feature, index) => {
              const angle = (feature.angle * Math.PI) / 180;
              const radius = 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.button
                  key={feature.id}
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-smooth transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedFeature === feature.id
                      ? 'bg-accent text-accent-foreground shadow-glow scale-125 neon-glow'
                      : 'glass-card text-foreground hover:bg-accent/20 hover:scale-110 shadow-card'
                  }`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`
                  }}
                  onClick={() => setSelectedFeature(feature.id)}
                  whileHover={{ scale: selectedFeature === feature.id ? 1.25 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {feature.icon}
                </motion.button>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {features.map((_, index) => {
                const nextIndex = (index + 1) % features.length;
                const angle1 = (features[index].angle * Math.PI) / 180;
                const angle2 = (features[nextIndex].angle * Math.PI) / 180;
                const radius = 180;
                
                const x1 = 192 + Math.cos(angle1) * radius;
                const y1 = 192 + Math.sin(angle1) * radius;
                const x2 = 192 + Math.cos(angle2) * radius;
                const y2 = 192 + Math.sin(angle2) * radius;

                return (
                  <motion.line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    opacity={0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Feature Detail Panel */}
          <AnimatePresence mode="wait">
            {selectedFeatureData && (
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring" }}
                className="absolute right-0 top-0 w-96 glass-card p-8 rounded-2xl shadow-space ml-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="text-accent">{selectedFeatureData.icon}</div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedFeatureData.title}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedFeature('')}
                    className="text-muted-foreground hover:text-accent transition-smooth"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Problem Statement</h3>
                    <p className="text-muted-foreground">{selectedFeatureData.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Our Solution</h3>
                    <p className="text-muted-foreground">{selectedFeatureData.solution}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Technologies & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFeatureData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-accent mb-2">Demo Performance</h3>
                    <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="text-foreground font-medium">{selectedFeatureData.demo}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Click on any feature node to explore detailed information about our AI swarm robotics technology
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;