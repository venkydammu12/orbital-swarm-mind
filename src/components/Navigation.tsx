import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/ai-swarm-logo.png';

const Navigation = () => {
  const location = useLocation();
  const [showLogoModal, setShowLogoModal] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/problem', label: 'Problem' },
    { path: '/swarm', label: 'Swarm' },
    { path: '/features', label: 'Loop' },
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
          <div className="flex items-center space-x-2">
            <img
              src={logoImage}
              alt="AI Swarm Logo"
              className="w-8 h-8 object-contain cursor-pointer hover:scale-110 transition-transform animate-pulse"
              onClick={() => setShowLogoModal(true)}
            />
            <Link to="/" className="text-xl font-bold text-white tracking-tight">
              AI Swarm
            </Link>
          </div>
          
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

      {/* Logo Modal */}
      <AnimatePresence>
        {showLogoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setShowLogoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.6
              }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={logoImage}
                alt="AI Swarm Robotics Logo"
                className="w-96 h-96 object-contain rounded-lg shadow-2xl"
                animate={{ 
                  rotateZ: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(0, 230, 255, 0)",
                    "0 0 0 20px rgba(0, 230, 255, 0.3)",
                    "0 0 0 40px rgba(0, 230, 255, 0)",
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;