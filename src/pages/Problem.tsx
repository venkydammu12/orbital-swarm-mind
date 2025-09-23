import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, AlertTriangle, Satellite, Zap } from 'lucide-react';

const Problem = () => {
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
              Orbital Decay.
              <br />
              <span className="text-accent">A Cascading Threat.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light">
              Over 34,000 pieces of space debris threaten our satellites, space stations, 
              and future missions. Each collision creates thousands more fragments.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            <div className="text-center border border-white/10 rounded-lg p-8 bg-white/[0.02]">
              <AlertTriangle className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">34,000+</div>
              <div className="text-white/60">Tracked debris objects</div>
            </div>
            
            <div className="text-center border border-white/10 rounded-lg p-8 bg-white/[0.02]">
              <Satellite className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">3,000+</div>
              <div className="text-white/60">Active satellites at risk</div>
            </div>
            
            <div className="text-center border border-white/10 rounded-lg p-8 bg-white/[0.02]">
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">17,500</div>
              <div className="text-white/60">mph collision speeds</div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Link to="/swarm">
              <Button 
                size="lg" 
                className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
              >
                See Our Solution
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Problem;