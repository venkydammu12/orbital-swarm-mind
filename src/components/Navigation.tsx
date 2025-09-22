import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/visualization', label: '3D Model' },
    { path: '/features', label: 'Features' },
    { path: '/technology', label: 'Technology' },
    { path: '/about', label: 'About' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-card-border/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full gradient-hero animate-pulse-glow" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Swarm Robotics
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button 
                  variant={location.pathname === item.path ? "space" : "ghost"}
                  size="sm"
                  className="transition-smooth"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <Button variant="hero" size="sm" className="animate-pulse-glow">
            Explore Project
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;