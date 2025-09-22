import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as anime from 'animejs';
import { Button } from '@/components/ui/button';
import FuturisticCard from '@/components/FuturisticCard';
import AnimatedText from '@/components/AnimatedText';
import { Eye, Package, Users, Monitor, Cpu, ArrowRight } from 'lucide-react';

const Features = () => {
  const loopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loopRef.current) {
      // Animate the feature loop
      anime({
        targets: '.feature-orbit',
        rotate: '360deg',
        duration: 30000,
        easing: 'linear',
        loop: true
      });

      anime({
        targets: '.feature-card',
        scale: [0.9, 1.1, 0.9],
        duration: 4000,
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(800)
      });
    }
  }, []);

  const features = [
    {
      id: 'detection',
      title: 'Debris Detection',
      description: 'Advanced AI algorithms and sensors identify space debris using computer vision and LIDAR technology.',
      icon: <Eye className="h-8 w-8" />,
      route: '/features/detection',
      color: 'from-accent to-accent-bright'
    },
    {
      id: 'storage',
      title: 'Storage & Collection',
      description: 'Specialized robotic systems safely capture and store debris without creating additional fragments.',
      icon: <Package className="h-8 w-8" />,
      route: '/features/storage', 
      color: 'from-primary to-primary-glow'
    },
    {
      id: 'coordination',
      title: 'Swarm Coordination',
      description: 'Distributed AI enables seamless coordination between multiple autonomous robots.',
      icon: <Users className="h-8 w-8" />,
      route: '/features/coordination',
      color: 'from-accent-bright to-accent'
    },
    {
      id: 'monitoring',
      title: 'Mission Monitoring',
      description: 'Real-time telemetry and health monitoring for all swarm operations.',
      icon: <Monitor className="h-8 w-8" />,
      route: '#',
      color: 'from-primary-glow to-primary'
    },
    {
      id: 'ai',
      title: 'AI Algorithms',
      description: 'Machine learning models for autonomous decision-making and optimization.',
      icon: <Cpu className="h-8 w-8" />,
      route: '#',
      color: 'from-accent to-primary-glow'
    }
  ];

  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <AnimatedText
            text="Interactive Feature Loop"
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive AI swarm robotics system through interactive feature panels. 
            Click on any feature to dive deep into its technical implementation.
          </p>
        </motion.div>

        {/* Central Feature Loop */}
        <div ref={loopRef} className="relative mb-20">
          <div className="flex items-center justify-center min-h-[600px]">
            {/* Central Hub */}
            <FuturisticCard 
              className="relative z-10 w-48 h-48 flex items-center justify-center bg-gradient-cosmic border-neon"
              glowEffect={true}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-neon rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
                  <Cpu className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-accent">AI Core</h3>
                <p className="text-sm text-muted-foreground">Central Control</p>
              </div>
            </FuturisticCard>

            {/* Orbital Features */}
            <div className="feature-orbit absolute inset-0 flex items-center justify-center">
              {features.map((feature, index) => {
                const angle = (index / features.length) * 360;
                const radius = 250;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={feature.id}
                    className="feature-card absolute"
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    whileHover={{ scale: 1.2, zIndex: 20 }}
                  >
                    <Link to={feature.route}>
                      <FuturisticCard 
                        className={`w-32 h-32 flex flex-col items-center justify-center bg-gradient-to-br ${feature.color} text-white cursor-pointer group`}
                        borderAnimation={true}
                        delay={index * 200}
                      >
                        <div className="text-center">
                          <div className="mb-2 group-hover:animate-pulse-glow transition-all">
                            {feature.icon}
                          </div>
                          <h4 className="text-xs font-semibold text-center leading-tight">
                            {feature.title}
                          </h4>
                        </div>
                      </FuturisticCard>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feature Details Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Link key={feature.id} to={feature.route}>
              <FuturisticCard
                delay={index * 100}
                className="h-full hover:shadow-neon transition-bounce cursor-pointer group"
              >
                <div className="text-center">
                  <div className="text-accent mb-4 group-hover:animate-neon-pulse transition-all">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-center text-accent group-hover:text-accent-bright transition-colors">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </FuturisticCard>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <FuturisticCard 
          glowEffect={true}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4 text-accent">Ready to Explore?</h2>
          <p className="text-muted-foreground mb-6">
            Dive deeper into each feature to understand the technical implementation 
            and innovative solutions behind our AI swarm robotics system.
          </p>
          <Link to="/visualization">
            <Button variant="default" size="lg" className="animate-pulse-glow">
              Experience 3D Visualization
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default Features;