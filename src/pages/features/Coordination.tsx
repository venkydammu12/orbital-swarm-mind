import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as anime from 'animejs';
import { Button } from '@/components/ui/button';
import FuturisticCard from '@/components/FuturisticCard';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, Network, Cpu, Radio, Users } from 'lucide-react';

const Coordination = () => {
  const swarmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swarmRef.current) {
      // Animate swarm coordination visualization
      anime({
        targets: '.swarm-robot',
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: [0.8, 1.2, 0.8],
        duration: () => anime.random(2000, 4000),
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(200)
      });

      anime({
        targets: '.communication-line',
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 2000,
        easing: 'easeInOutSine',
        loop: true
      });
    }
  }, []);

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
            Distributed AI algorithms enabling seamless coordination between multiple autonomous 
            robots for efficient space debris cleanup operations.
          </p>
        </motion.div>

        {/* Swarm Intelligence Concept */}
        <FuturisticCard delay={200} glowEffect={true} className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-accent">Swarm Intelligence</h2>
              <p className="text-muted-foreground mb-4">
                Our coordination system mimics natural swarm behaviors found in ant colonies and bird flocks, 
                enabling robots to work together efficiently without centralized control.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Decentralized decision making</li>
                <li>• Emergent collective behavior</li>
                <li>• Fault-tolerant operation</li>
                <li>• Dynamic task allocation</li>
              </ul>
            </div>
            <div ref={swarmRef} className="relative h-64 rounded-lg gradient-cosmic flex items-center justify-center">
              <svg width="200" height="200" className="absolute inset-0">
                {/* Communication lines between robots */}
                <line x1="50" y1="50" x2="150" y2="50" stroke="hsl(var(--accent))" strokeWidth="2" className="communication-line" strokeDasharray="5,5" />
                <line x1="50" y1="50" x2="100" y2="150" stroke="hsl(var(--accent))" strokeWidth="2" className="communication-line" strokeDasharray="5,5" />
                <line x1="150" y1="50" x2="100" y2="150" stroke="hsl(var(--accent))" strokeWidth="2" className="communication-line" strokeDasharray="5,5" />
              </svg>
              {/* Robot positions */}
              <div className="swarm-robot absolute w-4 h-4 bg-accent rounded-full" style={{ top: '20%', left: '20%' }} />
              <div className="swarm-robot absolute w-4 h-4 bg-accent rounded-full" style={{ top: '20%', right: '20%' }} />
              <div className="swarm-robot absolute w-4 h-4 bg-accent rounded-full" style={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)' }} />
            </div>
          </div>
        </FuturisticCard>

        {/* Communication Protocols */}
        <FuturisticCard delay={400} borderAnimation={true} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Communication Architecture</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Radio className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mesh Network</h3>
              <p className="text-muted-foreground">
                Self-healing network topology ensuring continuous communication between all robots.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Network className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Protocol Stack</h3>
              <p className="text-muted-foreground">
                Custom protocols optimized for space environment with error correction and redundancy.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Cpu className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Edge Computing</h3>
              <p className="text-muted-foreground">
                Distributed processing for real-time decision making and reduced communication overhead.
              </p>
            </motion.div>
          </div>
        </FuturisticCard>

        {/* Coordination Algorithms */}
        <FuturisticCard delay={600} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">AI Coordination Algorithms</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Task Allocation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Dynamic auction-based assignment</li>
                <li>• Capability-based matching</li>
                <li>• Load balancing optimization</li>
                <li>• Priority-based scheduling</li>
                <li>• Resource constraint handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Formation Control</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Flocking behavior algorithms</li>
                <li>• Collision avoidance systems</li>
                <li>• Path planning coordination</li>
                <li>• Velocity synchronization</li>
                <li>• Formation maintenance</li>
              </ul>
            </div>
          </div>
        </FuturisticCard>

        {/* Performance Metrics */}
        <FuturisticCard delay={800} glowEffect={true}>
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">System Performance</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scalability</h3>
              <p className="text-2xl font-bold text-accent">50+</p>
              <p className="text-sm text-muted-foreground">Concurrent robots</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Network className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Latency</h3>
              <p className="text-2xl font-bold text-accent">&lt;10ms</p>
              <p className="text-sm text-muted-foreground">Communication delay</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-2xl font-bold text-accent">85%</p>
              <p className="text-sm text-muted-foreground">Task completion rate</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Radio className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reliability</h3>
              <p className="text-2xl font-bold text-accent">99.9%</p>
              <p className="text-sm text-muted-foreground">Network uptime</p>
            </div>
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default Coordination;