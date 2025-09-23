import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Radio, Cpu, Package } from 'lucide-react';

const Swarm = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              The Swarm.
              <br />
              <span className="text-accent">Autonomous & Efficient.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light">
              Each robot operates independently while coordinating as a collective intelligence. 
              Detect, capture, and process debris with unprecedented precision.
            </p>
          </motion.div>

          {/* 3D Model Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-96 mb-20 border border-white/10 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent flex items-center justify-center group cursor-pointer"
          >
            <div className="text-center">
              <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                <Cpu className="h-12 w-12 text-accent" />
              </div>
              <p className="text-white/60">Interactive 3D Swarm Robot Model</p>
              <p className="text-sm text-white/40 mt-2">Click and drag to rotate</p>
            </div>
            
            {/* Interactive Hotspots */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-accent rounded-full animate-pulse cursor-pointer">
              <div className="absolute -top-8 -left-4 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Detection Array
              </div>
            </div>
            
            <div className="absolute bottom-20 right-20 w-4 h-4 bg-accent rounded-full animate-pulse cursor-pointer">
              <div className="absolute -bottom-8 -right-4 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Capture System
              </div>
            </div>
          </motion.div>

          {/* Capabilities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-4 gap-6 mb-20"
          >
            {[
              { icon: <Eye className="h-8 w-8" />, title: "Detect", desc: "Advanced sensors" },
              { icon: <Package className="h-8 w-8" />, title: "Capture", desc: "Precision grasping" },
              { icon: <Radio className="h-8 w-8" />, title: "Communicate", desc: "Swarm coordination" },
              { icon: <Cpu className="h-8 w-8" />, title: "Process", desc: "AI decision making" }
            ].map((capability, index) => (
              <div key={index} className="text-center group">
                <div className="text-accent mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                <p className="text-white/60 text-sm">{capability.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-center"
          >
            <Link to="/mothership">
              <Button 
                size="lg" 
                className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
              >
                Meet the Mothership
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Swarm;