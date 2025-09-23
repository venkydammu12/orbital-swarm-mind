import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FuturisticCard from '@/components/FuturisticCard';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, Network, Cpu, Radio, Users } from 'lucide-react';

const Coordination = () => {
  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Link to="/features">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Features
            </Button>
          </Link>
          
          <AnimatedText
            text="Swarm Coordination System"
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Distributed AI algorithms enable seamless coordination between multiple autonomous 
            robots for efficient space debris cleanup operations.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <FuturisticCard delay={200} glowEffect={true} className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-accent">Coordination Challenges</h2>
              <p className="text-muted-foreground mb-4">
                Managing multiple autonomous robots in space requires sophisticated coordination 
                algorithms to prevent collisions and optimize mission efficiency.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Real-time communication in space environment</li>
                <li>• Distributed decision-making without central control</li>
                <li>• Dynamic task allocation based on robot capabilities</li>
                <li>• Collision avoidance between swarm members</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg gradient-cosmic flex items-center justify-center">
              <div className="relative">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="swarm-node absolute w-4 h-4 bg-accent rounded-full"
                    style={{
                      top: `${Math.random() * 100}px`,
                      left: `${Math.random() * 100}px`
                    }}
                    animate={{
                      x: [0, Math.random() * 60 - 30, 0],
                      y: [0, Math.random() * 60 - 30, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FuturisticCard>

        {/* Communication Protocol */}
        <FuturisticCard delay={400} borderAnimation={true} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Communication Protocol</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Network className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mesh Network</h3>
              <p className="text-muted-foreground">
                Self-organizing wireless mesh network for reliable inter-robot communication.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Radio className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Radio Frequency</h3>
              <p className="text-muted-foreground">
                Low-latency RF communication for real-time coordination and status updates.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Cpu className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Consensus Algorithm</h3>
              <p className="text-muted-foreground">
                Distributed consensus mechanisms for coordinated decision-making.
              </p>
            </motion.div>
          </div>
        </FuturisticCard>

        {/* Swarm Intelligence */}
        <FuturisticCard delay={600} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Swarm Intelligence</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Emergent Behaviors</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Self-organizing formation patterns</li>
                <li>• Adaptive task redistribution</li>
                <li>• Collective problem-solving</li>
                <li>• Fault-tolerant operations</li>
                <li>• Dynamic role assignment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Coordination Algorithms</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Particle Swarm Optimization (PSO)</li>
                <li>• Ant Colony Optimization (ACO)</li>
                <li>• Flocking and swarming algorithms</li>
                <li>• Multi-agent reinforcement learning</li>
                <li>• Byzantine fault tolerance protocols</li>
              </ul>
            </div>
          </div>
        </FuturisticCard>

        {/* Performance Metrics */}
        <FuturisticCard delay={800} glowEffect={true}>
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Performance Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Swarm Size</h3>
              <p className="text-2xl font-bold text-accent">50+ Robots</p>
              <p className="text-sm text-muted-foreground">Scalable coordination</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Latency</h3>
              <p className="text-2xl font-bold text-accent">&lt;100ms</p>
              <p className="text-sm text-muted-foreground">Communication delay</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-2xl font-bold text-accent">98%</p>
              <p className="text-sm text-muted-foreground">Task completion rate</p>
            </div>
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default Coordination;