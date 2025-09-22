import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// @ts-ignore
import anime from 'animejs';
import { Button } from '@/components/ui/button';
import FuturisticCard from '@/components/FuturisticCard';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, Package, Recycle, Shield, Zap } from 'lucide-react';

const Storage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Animate storage mechanism
      anime({
        targets: '.storage-unit',
        scale: [0.8, 1, 0.8],
        duration: 4000,
        easing: 'easeInOutSine',
        loop: true,
        delay: anime.stagger(200)
      });

      anime({
        targets: '.debris-particle',
        translateX: [-50, 0, 50],
        translateY: [20, -10, 20],
        opacity: [0, 1, 0],
        duration: 3000,
        easing: 'easeInOutQuad',
        loop: true,
        delay: anime.stagger(400)
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
            text="Storage & Collection System"
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced robotic collection mechanisms and secure containment systems for 
            safe debris storage and disposal processing.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <FuturisticCard delay={200} glowEffect={true} className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-accent">Collection Challenges</h2>
              <p className="text-muted-foreground mb-4">
                Collecting space debris requires precise manipulation without creating additional fragments. 
                Each piece must be safely captured and stored for proper disposal.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Gentle capture to prevent fragmentation</li>
                <li>• Secure storage in zero-gravity environment</li>
                <li>• Efficient space utilization in storage units</li>
                <li>• Safe handling of hazardous materials</li>
              </ul>
            </div>
            <div ref={containerRef} className="relative h-64 rounded-lg gradient-cosmic flex items-center justify-center">
              <div className="relative">
                <div className="storage-unit w-16 h-16 bg-accent/20 rounded-lg border-2 border-accent" />
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`debris-particle absolute w-2 h-2 bg-accent rounded-full`}
                    style={{
                      top: `${Math.random() * 100}px`,
                      left: `${Math.random() * 100}px`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </FuturisticCard>

        {/* Collection Mechanism */}
        <FuturisticCard delay={400} borderAnimation={true} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Collection Mechanisms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Package className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Robotic Arms</h3>
              <p className="text-muted-foreground">
                Precision robotic manipulators with soft grippers for gentle debris capture.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Containment Nets</h3>
              <p className="text-muted-foreground">
                Deployable mesh nets for capturing multiple small debris pieces simultaneously.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Magnetic Capture</h3>
              <p className="text-muted-foreground">
                Electromagnetic systems for collecting metallic debris without physical contact.
              </p>
            </motion.div>
          </div>
        </FuturisticCard>

        {/* Storage System */}
        <FuturisticCard delay={600} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Storage Architecture</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Modular Storage Units</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Expandable containment chambers</li>
                <li>• Pressure-sealed compartments</li>
                <li>• Automated sorting mechanisms</li>
                <li>• Material categorization systems</li>
                <li>• Volume optimization algorithms</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Processing Capabilities</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Size-based debris classification</li>
                <li>• Material composition analysis</li>
                <li>• Hazard level assessment</li>
                <li>• Recycling potential evaluation</li>
                <li>• Disposal method determination</li>
              </ul>
            </div>
          </div>
        </FuturisticCard>

        {/* Technology Implementation */}
        <FuturisticCard delay={800} glowEffect={true}>
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Implementation Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Capacity</h3>
              <p className="text-2xl font-bold text-accent">500kg</p>
              <p className="text-sm text-muted-foreground">Maximum debris storage</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Efficiency</h3>
              <p className="text-2xl font-bold text-accent">95%</p>
              <p className="text-sm text-muted-foreground">Collection success rate</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Safety</h3>
              <p className="text-2xl font-bold text-accent">100%</p>
              <p className="text-sm text-muted-foreground">Containment integrity</p>
            </div>
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default Storage;