import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Rocket, Satellite, Factory } from 'lucide-react';

const Ideas = () => {
  const ideas = [
    {
      id: 'debris-mapping',
      title: 'Real-time Debris Mapping',
      description: 'AI-powered orbital debris tracking and prediction system',
      icon: <Satellite className="h-8 w-8" />,
      status: 'In Development'
    },
    {
      id: 'swarm-optimization',
      title: 'Swarm Path Optimization',
      description: 'Machine learning algorithms for efficient multi-robot coordination',
      icon: <Rocket className="h-8 w-8" />,
      status: 'Prototype'
    },
    {
      id: 'material-recycling',
      title: 'Advanced Material Recycling',
      description: 'On-orbit processing of space debris into construction materials',
      icon: <Factory className="h-8 w-8" />,
      status: 'Research'
    },
    {
      id: 'autonomous-docking',
      title: 'Autonomous Docking System',
      description: 'Precision docking mechanisms for debris capture and transfer',
      icon: <Lightbulb className="h-8 w-8" />,
      status: 'Concept'
    }
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
            Innovation <span className="text-accent">Pipeline</span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our collection of advanced concepts and research initiatives 
            that push the boundaries of space debris cleanup technology.
          </p>
        </motion.div>

        {/* Ideas Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="border border-white/10 rounded-lg p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                  <div className="text-accent">{idea.icon}</div>
                </div>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {idea.status}
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-accent transition-colors">
                {idea.title}
              </h3>
              
              <p className="text-white/70 mb-6 leading-relaxed">
                {idea.description}
              </p>
              
              <div className="flex items-center text-accent group-hover:text-accent-bright transition-colors">
                <span className="text-sm font-medium">Explore Concept</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center border border-white/10 rounded-lg p-12 bg-white/[0.02] mb-16"
        >
          <Lightbulb className="h-16 w-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            More Ideas Coming Soon
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            We're constantly developing new concepts and innovations. 
            Each idea represents a potential breakthrough in space cleanup technology.
          </p>
          <div className="text-accent text-sm font-medium">
            Next update: Advanced AI Coordination Protocols
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Link to="/about">
            <Button 
              size="lg" 
              className="bg-accent text-black hover:bg-accent/90 font-medium px-8 py-4 text-lg group"
            >
              Meet the Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Ideas;