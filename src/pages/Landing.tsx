import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Satellite } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float, Stars } from '@react-three/drei';
import anime from 'animejs';

// Cinematic 3D Background
const CinematicSpace = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
      
      {/* Central Earth */}
      <Float speed={0.5} rotationIntensity={0.2}>
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e40af" roughness={0.8} />
        </Sphere>
      </Float>
      
      {/* Orbiting debris */}
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const radius = 2 + Math.random() * 1;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1 + Math.random()} rotationIntensity={0.5}>
            <Sphere 
              args={[0.02 + Math.random() * 0.03]} 
              position={[x, (Math.random() - 0.5) * 0.5, z]}
            >
              <meshStandardMaterial 
                color="#FF4444" 
                emissive="#FF4444" 
                emissiveIntensity={0.3}
              />
            </Sphere>
          </Float>
        );
      })}
      
      {/* AI Swarm robots */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 1.8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={2} rotationIntensity={0.3}>
            <group position={[x, 0, z]}>
              <Sphere args={[0.05]}>
                <meshStandardMaterial 
                  color="#00E6FF" 
                  emissive="#00E6FF" 
                  emissiveIntensity={0.5}
                />
              </Sphere>
            </group>
          </Float>
        );
      })}
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const Landing = () => {
  React.useEffect(() => {
    // Cinematic title animation
    anime({
      targets: '.hero-title',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .6)',
      delay: 500
    });

    // Subtitle animation
    anime({
      targets: '.hero-subtitle',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 1000,
      easing: 'easeOutQuart',
      delay: 1000
    });

    // CTA button animation
    anime({
      targets: '.hero-cta',
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 800,
      easing: 'easeOutBack',
      delay: 1500
    });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <CinematicSpace />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-clip-text text-transparent opacity-0">
              AI SWARM ROBOTICS
            </h1>
            
            <h2 className="hero-subtitle text-2xl md:text-4xl font-light mb-8 text-cyan-400 opacity-0">
              Autonomous Orbital Debris Cleanup
            </h2>
            
            <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Autonomous AI swarm robots working together to clean up space debris, 
              making Earth's orbit safer for future space exploration and satellites.
            </p>
            
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <Link to="/mission-control">
                <Button className="bg-cyan-400 text-black hover:bg-cyan-500 font-bold px-12 py-6 text-xl group shadow-lg hover:shadow-cyan-400/50 transition-all">
                  [ Launch Mission Control ]
                  <Satellite className="ml-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Mission Stats Overlay */}
        <div className="absolute bottom-8 left-8 z-20">
          <div className="bg-black/80 border border-cyan-400/30 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-cyan-400 font-bold text-sm mb-2">LIVE MISSION STATUS</h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <div className="text-white font-mono">47</div>
                <div className="text-gray-400">Active Robots</div>
              </div>
              <div>
                <div className="text-cyan-400 font-mono">1,247</div>
                <div className="text-gray-400">Debris Tracked</div>
              </div>
              <div>
                <div className="text-green-400 font-mono">89%</div>
                <div className="text-gray-400">Mission Success</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;