import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Cpu, Brain, Zap, Target, Network, BarChart } from 'lucide-react';

const AiAlgorithms = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/features">
            <Button variant="ghost" size="sm" className="mb-6 text-white/60 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Features
            </Button>
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            AI <span className="text-accent">Algorithms</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced machine learning models enable autonomous decision-making, 
            path optimization, and intelligent coordination across the entire swarm.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">AI Challenges</h2>
              <p className="text-white/70 mb-4">
                Space debris cleanup requires sophisticated AI to handle dynamic environments, 
                multi-objective optimization, and real-time decision making under uncertainty.
              </p>
              <ul className="space-y-2 text-white/60">
                <li>• Real-time path planning and collision avoidance</li>
                <li>• Multi-agent coordination and task allocation</li>
                <li>• Adaptive behavior in changing conditions</li>
                <li>• Predictive maintenance and failure recovery</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <Brain className="h-24 w-24 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Core AI Systems */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Core AI Systems</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="h-12 w-12" />,
                title: "Path Planning",
                description: "Deep reinforcement learning for optimal trajectory generation",
                tech: "Deep Q-Networks (DQN)"
              },
              {
                icon: <Network className="h-12 w-12" />,
                title: "Swarm Coordination",
                description: "Multi-agent systems with distributed consensus algorithms",
                tech: "Graph Neural Networks"
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "Decision Making",
                description: "Real-time autonomous decision trees with uncertainty handling",
                tech: "Monte Carlo Tree Search"
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-accent mb-4 flex justify-center">
                  {system.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{system.title}</h3>
                <p className="text-white/60 mb-4">{system.description}</p>
                <div className="text-accent text-sm font-mono bg-accent/10 px-3 py-1 rounded-full inline-block">
                  {system.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Algorithm Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Algorithm Architecture</h2>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Machine Learning Models</h3>
                <ul className="space-y-2 text-white/60">
                  <li>• Convolutional Neural Networks for object detection</li>
                  <li>• Recurrent Neural Networks for temporal analysis</li>
                  <li>• Transformer architectures for sequence modeling</li>
                  <li>• Reinforcement Learning for adaptive behavior</li>
                  <li>• Ensemble methods for robust predictions</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Optimization Algorithms</h3>
                <ul className="space-y-2 text-white/60">
                  <li>• Genetic algorithms for mission planning</li>
                  <li>• Particle swarm optimization for coordination</li>
                  <li>• Simulated annealing for path optimization</li>
                  <li>• Multi-objective evolutionary algorithms</li>
                  <li>• Ant colony optimization for task assignment</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Accuracy</h3>
              <p className="text-2xl font-bold text-accent">96.7%</p>
              <p className="text-sm text-white/60">Object detection</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Response Time</h3>
              <p className="text-2xl font-bold text-green-400">&lt;50ms</p>
              <p className="text-sm text-white/60">Decision latency</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Efficiency</h3>
              <p className="text-2xl font-bold text-blue-400">89%</p>
              <p className="text-sm text-white/60">Resource utilization</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scalability</h3>
              <p className="text-2xl font-bold text-purple-400">1000+</p>
              <p className="text-sm text-white/60">Concurrent agents</p>
            </div>
          </div>
        </motion.div>

        {/* Training & Development */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02]"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Training & Development</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Training Data</h3>
              <ul className="space-y-2 text-white/60">
                <li>• 10M+ simulated orbital scenarios</li>
                <li>• 500K+ real debris tracking data points</li>
                <li>• Multi-physics simulation environments</li>
                <li>• Synthetic data augmentation techniques</li>
                <li>• Continuous learning from operations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Development Pipeline</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Automated model validation and testing</li>
                <li>• A/B testing for algorithm improvements</li>
                <li>• Edge deployment optimization</li>
                <li>• Federated learning across swarm</li>
                <li>• Real-time model updates and rollback</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiAlgorithms;