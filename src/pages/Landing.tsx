import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Target } from 'lucide-react';
import heroImage from '@/assets/hero-space-swarm.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen space-bg">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 gradient-space opacity-40" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary-glow bg-clip-text text-transparent animate-fade-in-up">
              AI Swarm Robotics
            </h1>
            
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-2xl md:text-4xl font-light mb-8 text-muted-foreground"
            >
              for Space Junk Cleanup
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl mb-12 text-muted-foreground max-w-2xl mx-auto"
            >
              Autonomous AI swarm robots working together to clean up space debris, 
              making Earth's orbit safer for future space exploration and satellites.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/visualization">
                <Button variant="hero" size="lg" className="group animate-pulse-glow">
                  Explore Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/features">
                <Button variant="space" size="lg">
                  View Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-4 h-4 rounded-full bg-accent/30 animate-pulse-glow" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-2 h-2 rounded-full bg-primary-glow/40 animate-pulse-glow" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-3 h-3 rounded-full bg-accent/20 animate-pulse-glow" />
        </div>
      </section>

      {/* Key Features Preview */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Revolutionary Space Technology
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "AI Swarm Intelligence",
                description: "Coordinated autonomous robots that work together using advanced AI algorithms"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Debris Detection",
                description: "Advanced sensors and computer vision to identify and track space debris"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Precision Cleanup",
                description: "Safe and efficient collection of space junk without creating more debris"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl shadow-card hover:shadow-glow transition-smooth group"
              >
                <div className="text-accent mb-4 group-hover:animate-pulse-glow transition-smooth">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 gradient-space">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-4xl font-bold mb-6 text-primary-foreground">
              Ready to Explore the Future?
            </h3>
            <p className="text-xl mb-8 text-primary-foreground/80">
              Dive deep into our 3D visualization and interactive features to see how 
              AI swarm robotics will revolutionize space cleanup.
            </p>
            <Link to="/visualization">
              <Button variant="accent" size="lg" className="animate-pulse-glow">
                Start Interactive Tour
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;