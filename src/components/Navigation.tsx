import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/problem', label: 'Problem' },
    { path: '/swarm', label: 'Swarm' },
    { path: '/features', label: 'Features' },
    { path: '/demo', label: 'Demo' },
    { path: '/sdg-mdg', label: 'Impact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
            <span className="text-xl font-bold text-white tracking-tight">
              AI Swarm
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path 
                    ? 'text-accent' 
                    : 'text-white hover:text-accent'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/features">
            <Button 
              size="sm" 
              className="bg-accent text-black hover:bg-accent/90 font-medium px-6"
            >
              Explore Project →
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;