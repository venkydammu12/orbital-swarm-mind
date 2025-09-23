import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Pause, RotateCcw } from 'lucide-react';

const Demo = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const timelineSteps = [
    { title: "Mission Start", desc: "Swarm deploys from mothership", time: "T+00:00" },
    { title: "Detection Phase", desc: "Robots scan and identify debris", time: "T+02:30" },
    { title: "Coordination", desc: "Swarm assigns targets and paths", time: "T+05:00" },
    { title: "Capture Operations", desc: "Precision grasping of debris", time: "T+08:15" },
    { title: "Transfer Phase", desc: "Return to mothership", time: "T+12:00" },
    { title: "Processing", desc: "Debris recycled into materials", time: "T+15:30" }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Mission <span className="text-accent">Timeline</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Watch our AI swarm robotics system in action. From detection to recycling, 
            experience the complete debris cleanup workflow.
          </p>
        </motion.div>

        {/* Demo Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative h-96 mb-12 border border-white/10 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-12 w-12 text-accent" />
              </div>
              <p className="text-white/60 text-lg">Interactive Mission Simulation</p>
              <p className="text-sm text-white/40 mt-2">Step-by-step workflow visualization</p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/10 rounded-full h-2">
              <div 
                className="bg-accent rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentStep / (timelineSteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4 mb-16"
        >
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-accent text-black hover:bg-accent/90"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          
          <Button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Mission Steps</h2>
          
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-6 p-6 rounded-lg border transition-all duration-300 cursor-pointer ${
                  index === currentStep 
                    ? 'border-accent bg-accent/5' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  index === currentStep ? 'bg-accent text-black' : 'bg-white/10 text-white'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>
                
                <div className="text-accent font-mono text-sm">
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link to="/sdg-mdg">
            <Button 
              size="lg" 
              className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
            >
              View Impact & Goals
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Demo;