import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radar, 
  Bot, 
  Database, 
  Recycle, 
  Zap, 
  RotateCcw, 
  X,
  ArrowRight
} from 'lucide-react';

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

const loopSteps: LoopStep[] = [
  {
    id: 'detect',
    title: 'DETECT',
    subtitle: 'AI-Powered Detection',
    icon: <Radar className="w-8 h-8" />,
    color: '#00E6FF',
    description: 'Advanced AI systems scan orbital space to identify and track debris objects using multi-sensor arrays.',
    technologies: ['LiDAR Sensors', 'Computer Vision', 'Machine Learning', 'Satellite Tracking'],
    process: [
      'Orbital radar sweep initialization',
      'Object classification using AI',
      'Trajectory prediction algorithms',
      'Threat assessment and prioritization'
    ],
    demo: <RadarDemo />
  },
  {
    id: 'collect',
    title: 'COLLECT',
    subtitle: 'Robotic Swarm Capture',
    icon: <Bot className="w-8 h-8" />,
    color: '#FFB86B',
    description: 'Autonomous drone swarms deploy specialized capture mechanisms to safely retrieve space debris.',
    technologies: ['Robotic Arms', 'Magnetic Grippers', 'Net Deployment', 'Swarm Coordination'],
    process: [
      'Swarm formation optimization',
      'Debris approach trajectory',
      'Capture mechanism deployment',
      'Secure debris containment'
    ],
    demo: <CollectDemo />
  },
  {
    id: 'store',
    title: 'STORE',
    subtitle: 'Secure Containment',
    icon: <Database className="w-8 h-8" />,
    color: '#00E6FF',
    description: 'Collected debris is safely stored in specialized containment pods for transport to processing facility.',
    technologies: ['Containment Pods', 'Magnetic Seals', 'Pressure Systems', 'Material Sorting'],
    process: [
      'Debris categorization',
      'Pod allocation and sealing',
      'Inventory documentation',
      'Transport preparation'
    ],
    demo: <StoreDemo />
  },
  {
    id: 'reuse',
    title: 'REUSE',
    subtitle: 'Material Transformation',
    icon: <Recycle className="w-8 h-8" />,
    color: '#FFB86B',
    description: 'Advanced recycling processes transform debris into valuable materials for space construction.',
    technologies: ['3D Printing', 'Metal Refining', 'Molecular Assembly', 'Quality Control'],
    process: [
      'Material analysis and breakdown',
      'Purification and refinement',
      'New component manufacturing',
      'Quality assurance testing'
    ],
    demo: <ReuseDemo />
  },
  {
    id: 'recharge',
    title: 'RECHARGE',
    subtitle: 'Solar Power Renewal',
    icon: <Zap className="w-8 h-8" />,
    color: '#00E6FF',
    description: 'Solar arrays provide sustainable power for continuous operation of the cleanup system.',
    technologies: ['Solar Panels', 'Battery Storage', 'Power Management', 'Energy Optimization'],
    process: [
      'Solar energy collection',
      'Battery charging cycles',
      'Power distribution management',
      'System efficiency monitoring'
    ],
    demo: <RechargeDemo />
  },
  {
    id: 'repeat',
    title: 'REPEAT',
    subtitle: 'Continuous Cycle',
    icon: <RotateCcw className="w-8 h-8" />,
    color: '#FFB86B',
    description: 'The autonomous system continues the cycle, creating a self-sustaining orbital cleanup operation.',
    technologies: ['Automation Systems', 'Mission Planning', 'Fleet Management', 'Continuous Monitoring'],
    process: [
      'Mission cycle initialization',
      'Performance optimization',
      'System self-diagnostics',
      'Next target identification'
    ],
    demo: <RepeatDemo />
  }
];

// Demo Components
function RadarDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute inset-0 border-2 border-accent/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-4 left-4 w-2 h-2 bg-accent rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-2 h-2 bg-orange-400 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">SCANNING...</div>
    </div>
  );
}

function CollectDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent rounded-sm"
        animate={{ x: [0, 100, 100, 0], y: [0, 0, -50, -50] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-2 h-2 bg-orange-400 rounded-full"
        animate={{ scale: [1, 0.5], opacity: [1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">CAPTURING...</div>
    </div>
  );
}

function StoreDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-accent rounded-lg transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-1 bg-accent transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scaleX: [0, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">STORING...</div>
    </div>
  );
}

function ReuseDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/4 w-6 h-6 bg-orange-400 rounded-sm"
        animate={{ 
          scale: [1, 0.5, 0.5, 1],
          borderRadius: ["0%", "50%", "50%", "0%"],
          backgroundColor: ["#FFB86B", "#00E6FF", "#00E6FF", "#FFB86B"]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-4 h-4 bg-accent"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">TRANSFORMING...</div>
    </div>
  );
}

function RechargeDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute top-4 left-1/2 w-12 h-8 border-2 border-accent transform -translate-x-1/2"
        animate={{ borderColor: ["#00E6FF", "#FFB86B", "#00E6FF"] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-8 left-1/2 w-8 h-4 bg-accent transform -translate-x-1/2"
        animate={{ scaleY: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">CHARGING...</div>
    </div>
  );
}

function RepeatDemo() {
  return (
    <div className="relative w-full h-48 bg-background rounded-lg border border-accent/20 overflow-hidden">
      <motion.div
        className="absolute inset-4 border-2 border-accent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-4 h-4 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <div className="absolute bottom-2 left-2 text-xs text-accent">CYCLING...</div>
    </div>
  );
}

const SustainableLoop: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(false);

  const selectedStepData = selectedStep ? loopSteps.find(step => step.id === selectedStep) : null;

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
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
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-accent to-orange-400 bg-clip-text text-transparent">
            SUSTAINABLE LOOP
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A continuous cycle of detection, collection, and transformation that creates 
            a self-sustaining orbital cleanup ecosystem.
          </p>
        </motion.div>

        {/* Main Loop Timeline */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Timeline */}
          <div className="flex flex-col space-y-8">
            {loopSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < loopSteps.length - 1 && (
                  <motion.div
                    className="absolute left-6 top-16 w-0.5 h-8 bg-accent/50"
                    animate={{ scaleY: [0, 1] }}
                    transition={{ delay: (index * 0.1) + 0.5, duration: 0.3 }}
                  />
                )}

                {/* Step Node */}
                <motion.button
                  onClick={() => setSelectedStep(step.id)}
                  className="flex items-center space-x-4 group relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon Container */}
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 border-accent bg-background flex items-center justify-center relative overflow-hidden"
                    style={{ borderColor: step.color }}
                    animate={{
                      boxShadow: [
                        `0 0 0 0 ${step.color}30`,
                        `0 0 0 10px ${step.color}10`,
                        `0 0 0 0 ${step.color}30`,
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      style={{ color: step.color }}
                      animate={{ rotate: step.id === 'repeat' ? 360 : 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      {step.icon}
                    </motion.div>
                  </motion.div>

                  {/* Step Info */}
                  <div className="text-left">
                    <h3 className="text-xl font-bold" style={{ color: step.color }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{step.subtitle}</p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Cycle Complete Button */}
          <motion.button
            onClick={() => setShowOverview(true)}
            className="lg:ml-16 px-8 py-4 bg-accent/10 border border-accent rounded-lg hover:bg-accent/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-accent bg-background flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <RotateCcw className="w-8 h-8 text-accent" />
              </motion.div>
              <h3 className="text-lg font-bold text-accent">Complete Cycle</h3>
              <p className="text-sm text-gray-400">View Full Animation</p>
            </div>
          </motion.button>
        </div>

        {/* Step Detail Modal */}
        <AnimatePresence>
          {selectedStepData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedStep(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-background border border-accent/30 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                    className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
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
                      <h3 className="text-xl font-semibold mb-3 text-accent">Description</h3>
                      <p className="text-gray-300 leading-relaxed">{selectedStepData.description}</p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">Technologies</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStepData.technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-3 py-2 bg-accent/10 border border-accent/30 rounded-lg text-sm"
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Process */}
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-accent">Process</h3>
                      <div className="space-y-2">
                        {selectedStepData.process.map((step, index) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <div 
                              className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                              style={{ borderColor: selectedStepData.color, color: selectedStepData.color }}
                            >
                              {index + 1}
                            </div>
                            <p className="text-gray-300">{step}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Demo */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-accent">Live Demo</h3>
                    {selectedStepData.demo}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overview Animation Modal */}
        <AnimatePresence>
          {showOverview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setShowOverview(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-background border border-accent/30 rounded-2xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-accent bg-background flex items-center justify-center relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <RotateCcw className="w-16 h-16 text-accent" />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(0, 230, 255, 0.4)",
                          "0 0 0 20px rgba(0, 230, 255, 0.1)",
                          "0 0 0 40px rgba(0, 230, 255, 0)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  <motion.h2
                    className="text-3xl font-bold text-accent mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MISSION COMPLETE
                  </motion.h2>
                  
                  <p className="text-gray-300 mb-6">
                    The sustainable loop is now operational. The system will continue 
                    autonomously, creating a cleaner orbital environment.
                  </p>
                  
                  <motion.button
                    onClick={() => setShowOverview(false)}
                    className="px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-accent/90 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Mission
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SustainableLoop;