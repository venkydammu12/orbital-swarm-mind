import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Satellite, Activity, Target, Shield } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars, Ring } from '@react-three/drei';
import anime from 'animejs';

// Cinematic Water Torch Space Background
const CinematicSpaceBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#00E6FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#FFB86B" />
      <pointLight position={[0, 15, 0]} intensity={1.2} color="#FFFFFF" />
      
      {/* Deep space stars */}
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
      
      {/* Central Earth */}
      <Float speed={0.3} rotationIntensity={0.1}>
        <Sphere args={[1.2]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#1e40af" 
            roughness={0.8}
            metalness={0.2}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Sphere>
      </Float>
      
      {/* Orbital rings with water torch effect */}
      <Ring args={[2.5, 2.52, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#00E6FF" transparent opacity={0.4} />
      </Ring>
      <Ring args={[3.2, 3.22, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#FFB86B" transparent opacity={0.3} />
      </Ring>
      
      {/* Floating debris field */}
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = (i / 80) * Math.PI * 2;
        const radius = 2.8 + Math.random() * 1.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.8}>
            <Sphere 
              args={[0.02 + Math.random() * 0.04]} 
              position={[x, (Math.random() - 0.5) * 0.8, z]}
            >
              <meshStandardMaterial 
                color="#FF4444" 
                emissive="#FF4444" 
                emissiveIntensity={0.4}
              />
            </Sphere>
          </Float>
        );
      })}
      
      {/* AI Swarm robots */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1.5} rotationIntensity={0.2}>
            <group position={[x, Math.sin(i) * 0.3, z]}>
              <Sphere args={[0.06]}>
                <meshStandardMaterial 
                  color="#00E6FF" 
                  emissive="#00E6FF" 
                  emissiveIntensity={0.6}
                />
              </Sphere>
            </group>
          </Float>
        );
      })}
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </Canvas>
  );
};

const Landing = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cinematic title animation with water torch effect
    anime({
      targets: titleRef.current,
      opacity: [0, 1],
      scale: [0.7, 1],
      duration: 2000,
      easing: 'easeOutElastic(1, .6)',
      delay: 800
    });

    // Subtitle with glow effect
    anime({
      targets: subtitleRef.current,
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1200,
      easing: 'easeOutQuart',
      delay: 1500
    });

    // CTA with pulsing glow
    anime({
      targets: ctaRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutBack',
      delay: 2200
    });

    // Continuous glow animation for title
    anime({
      targets: titleRef.current,
      textShadow: [
        '0 0 20px #00E6FF, 0 0 40px #00E6FF, 0 0 60px #00E6FF',
        '0 0 30px #00E6FF, 0 0 60px #00E6FF, 0 0 90px #00E6FF',
        '0 0 20px #00E6FF, 0 0 40px #00E6FF, 0 0 60px #00E6FF'
      ],
      duration: 3000,
      loop: true,
      easing: 'easeInOutSine',
      delay: 3000
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic 3D Background */}
      <div className="absolute inset-0 z-0">
        <CinematicSpaceBackground />
      </div>
      
      {/* Water torch light overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-cyan-500/5 to-black/60" />
      
      {/* Hero Content */}
      <section className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            {/* Main Title */}
            <h1 
              ref={titleRef}
              className="text-7xl md:text-9xl font-bold mb-8 text-white opacity-0"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                letterSpacing: '-0.02em'
              }}
            >
              AI SWARM
              <br />
              <span className="text-cyan-400">ROBOTICS</span>
            </h1>
            
            {/* Subtitle */}
            <h2 
              ref={subtitleRef}
              className="text-3xl md:text-5xl font-light mb-12 text-cyan-400 opacity-0"
              style={{
                textShadow: '0 0 20px #00E6FF'
              }}
            >
              Autonomous Orbital Debris Cleanup
            </h2>
            
            {/* Mission Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="text-xl md:text-2xl mb-16 text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary AI swarm technology deploying autonomous robots to clean space debris, 
              protect satellites, and ensure safe orbital operations for future space exploration.
            </motion.p>
            
            {/* CTA Button */}
            <div ref={ctaRef} className="opacity-0">
              <Link to="/mission-control">
                <Button 
                  className="bg-cyan-400 text-black hover:bg-cyan-500 font-bold px-16 py-8 text-2xl group shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 30px #00E6FF40, 0 0 60px #00E6FF20'
                  }}
                >
                  [ LAUNCH MISSION CONTROL ]
                  <Satellite className="ml-4 h-8 w-8 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Mission Status HUD */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-8 z-30"
      >
        <div className="bg-black/90 border border-cyan-400/50 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            LIVE MISSION STATUS
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Active Robots:</span>
                <span className="text-cyan-400 font-mono font-bold">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Debris Tracked:</span>
                <span className="text-orange-400 font-mono font-bold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Collected Today:</span>
                <span className="text-green-400 font-mono font-bold">89</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Mission Success:</span>
                <span className="text-green-400 font-mono font-bold">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fleet Health:</span>
                <span className="text-cyan-400 font-mono font-bold">98.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Orbit Status:</span>
                <span className="text-green-400 font-mono font-bold">SAFE</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Objectives HUD */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 right-8 z-30"
      >
        <div className="bg-black/90 border border-cyan-400/50 rounded-lg p-6 backdrop-blur-sm">
          <h3 className="text-cyan-400 font-bold text-lg mb-4">MISSION OBJECTIVES</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Target className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Clean orbital debris field</span>
              <span className="text-green-400 font-bold">73%</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-gray-300">Protect satellite networks</span>
              <span className="text-green-400 font-bold">ACTIVE</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="h-4 w-4 text-orange-400" />
              <span className="text-gray-300">Maintain fleet operations</span>
              <span className="text-orange-400 font-bold">ONGOING</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles for water torch effect */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Landing;