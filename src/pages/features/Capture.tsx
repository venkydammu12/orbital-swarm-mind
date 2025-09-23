import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Grip, Shield, Zap, Target, Settings } from 'lucide-react';

const Capture = () => {
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
            Precision <span className="text-accent">Capture</span>
          </h1>
          
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Advanced robotic capture systems safely secure space debris without 
            creating additional fragments or compromising mission safety.
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
              <h2 className="text-3xl font-bold text-white mb-4">Capture Challenges</h2>
              <p className="text-white/70 mb-4">
                Securing space debris requires precision mechanisms that prevent fragmentation 
                while maintaining control in zero-gravity environments.
              </p>
              <ul className="space-y-2 text-white/60">
                <li>• Zero-gravity grasping dynamics</li>
                <li>• Fragmentation prevention techniques</li>
                <li>• Variable debris size and shape handling</li>
                <li>• Safe approach and contact protocols</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg bg-gradient-to-br from-accent/10 to-transparent flex items-center justify-center">
              <Package className="h-24 w-24 text-accent" />
            </div>
          </div>
        </motion.div>

        {/* Capture Mechanisms */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Capture Mechanisms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Grip className="h-12 w-12" />,
                title: "Adaptive Grasping",
                description: "Multi-fingered robotic hands with force feedback and adaptive grip",
                features: ["6-DOF manipulation", "Force sensing", "Adaptive algorithms"]
              },
              {
                icon: <Shield className="h-12 w-12" />,
                title: "Containment Systems",
                description: "Flexible nets and enclosure systems for irregular debris",
                features: ["Expandable nets", "Smart materials", "Secure containment"]
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "Magnetic Capture",
                description: "Electromagnetic systems for metallic debris manipulation",
                features: ["Variable field strength", "Precision control", "Safe deactivation"]
              }
            ].map((mechanism, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.4 }}
                className="border border-white/10 rounded-lg p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-accent mb-4 flex justify-center">
                  {mechanism.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{mechanism.title}</h3>
                <p className="text-white/60 mb-4">{mechanism.description}</p>
                <ul className="space-y-1">
                  {mechanism.features.map((feature, i) => (
                    <li key={i} className="text-white/50 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Capture Process */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Capture Process</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Approach", desc: "Controlled approach to debris target", icon: <Target className="h-8 w-8" /> },
              { step: "2", title: "Assessment", desc: "Real-time debris analysis and strategy selection", icon: <Settings className="h-8 w-8" /> },
              { step: "3", title: "Capture", desc: "Precision grasping or containment execution", icon: <Grip className="h-8 w-8" /> },
              { step: "4", title: "Secure", desc: "Safe storage and transport preparation", icon: <Shield className="h-8 w-8" /> }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-accent">{step.icon}</div>
                </div>
                <div className="text-accent font-bold text-lg mb-2">Step {step.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02] mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Performance Specifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Capture Rate</h3>
              <p className="text-2xl font-bold text-green-400">94%</p>
              <p className="text-sm text-white/60">Success rate on first attempt</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Size Range</h3>
              <p className="text-2xl font-bold text-accent">1cm - 2m</p>
              <p className="text-sm text-white/60">Debris handling capability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Safety Factor</h3>
              <p className="text-2xl font-bold text-blue-400">99.8%</p>
              <p className="text-sm text-white/60">Fragmentation prevention</p>
            </div>
          </div>
        </motion.div>

        {/* Safety Protocols */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="border border-white/10 rounded-lg p-8 bg-white/[0.02]"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-8">Safety Protocols</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Pre-Capture Safety</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Debris material composition analysis</li>
                <li>• Structural integrity assessment</li>
                <li>• Safe approach trajectory calculation</li>
                <li>• Emergency abort sequence preparation</li>
                <li>• Collision avoidance protocols</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Post-Capture Protocol</h3>
              <ul className="space-y-2 text-white/60">
                <li>• Secure containment verification</li>
                <li>• Debris stabilization procedures</li>
                <li>• Transport path optimization</li>
                <li>• Continuous monitoring systems</li>
                <li>• Emergency jettison capabilities</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Capture;