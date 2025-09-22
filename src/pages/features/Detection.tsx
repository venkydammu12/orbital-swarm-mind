import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as anime from 'animejs';
import { Button } from '@/components/ui/button';
import FuturisticCard from '@/components/FuturisticCard';
import AnimatedText from '@/components/AnimatedText';
import { ArrowLeft, Eye, Radar, Cpu, Target } from 'lucide-react';

const Detection = () => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      // Animate detection visualization
      anime({
        targets: '.detection-wave',
        scale: [0, 1.5],
        opacity: [0.8, 0],
        duration: 2000,
        easing: 'easeOutExpo',
        loop: true,
        delay: anime.stagger(500)
      });

      anime({
        targets: '.debris-target',
        rotate: '360deg',
        duration: 8000,
        easing: 'linear',
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
            text="Debris Detection System"
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          />
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered sensors and computer vision algorithms for precise identification 
            and tracking of space debris in Earth's orbit.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <FuturisticCard delay={200} glowEffect={true} className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-accent">The Problem</h2>
              <p className="text-muted-foreground mb-4">
                Over 34,000 pieces of trackable space debris orbit Earth at speeds up to 28,000 km/h. 
                These objects pose a significant threat to operational satellites and the International Space Station.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Detection accuracy challenges in the space environment</li>
                <li>• Real-time tracking of fast-moving objects</li>
                <li>• Distinguishing debris from operational satellites</li>
                <li>• Size variation from paint flecks to entire satellites</li>
              </ul>
            </div>
            <div className="relative h-64 rounded-lg gradient-cosmic flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`detection-wave absolute inset-0 border-2 border-accent rounded-full w-32 h-32`}
                    />
                  ))}
                  <Target className="h-8 w-8 text-accent debris-target" />
                </div>
              </div>
            </div>
          </div>
        </FuturisticCard>

        {/* Solution */}
        <FuturisticCard delay={400} borderAnimation={true} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Our Solution</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Eye className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Computer Vision</h3>
              <p className="text-muted-foreground">
                Advanced AI algorithms analyze visual data to identify debris patterns and characteristics.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Radar className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">LIDAR Sensing</h3>
              <p className="text-muted-foreground">
                High-precision laser ranging for accurate distance and size measurements of debris.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <Cpu className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground">
                Machine learning models process sensor data for real-time debris classification.
              </p>
            </motion.div>
          </div>
        </FuturisticCard>

        {/* Technology Stack */}
        <FuturisticCard delay={600} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Hardware Components</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• High-resolution optical cameras</li>
                <li>• LIDAR sensors for distance measurement</li>
                <li>• Infrared thermal imaging sensors</li>
                <li>• Radar systems for tracking</li>
                <li>• Edge computing units for real-time processing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Software & Algorithms</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• TensorFlow/PyTorch deep learning models</li>
                <li>• OpenCV for computer vision processing</li>
                <li>• Kalman filters for trajectory prediction</li>
                <li>• ROS (Robot Operating System) framework</li>
                <li>• Python and C++ for high-performance computing</li>
              </ul>
            </div>
          </div>
        </FuturisticCard>

        {/* Demo Section */}
        <FuturisticCard delay={800} glowEffect={true}>
          <h2 className="text-3xl font-bold mb-6 text-accent text-center">Interactive Demo</h2>
          <div className="bg-card rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-6">
              Experience our detection algorithm in action with real-time debris identification simulation.
            </p>
            <div className="aspect-video bg-gradient-cosmic rounded-lg mb-6 flex items-center justify-center">
              <p className="text-accent text-lg">Demo Video Placeholder</p>
            </div>
            <Button variant="default" size="lg" className="animate-pulse-glow">
              Launch Interactive Demo
            </Button>
          </div>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default Detection;