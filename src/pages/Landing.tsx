import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Target, Satellite } from 'lucide-react';
import StarfieldBackground from '@/components/StarfieldBackground';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float } from '@react-three/drei';
import anime from 'animejs';

// Cinematic 3D Background
const CinematicSpace = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />
      
      {/* Central Earth */}
      <Float speed={0.5} rotationIntensity={0.2}>
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#1e40af" roughness={0.8} />
        </Sphere>
      </Float>
      
      {/* Orbiting debris */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
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

      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Mission Control <span className="text-cyan-400">Systems</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Access all mission-critical systems and monitoring tools
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {tabs.map((tab, index) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="cursor-pointer"
                onClick={() => setActiveTab(tab.id as any)}
              >
                <div className="bg-gray-900 border border-gray-700 hover:border-cyan-400/50 rounded-lg p-6 text-center transition-all duration-300 group">
                  <div className="w-16 h-16 bg-cyan-400/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/20 transition-colors">
                    <tab.icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {tab.label}
                  </h3>
                  <div className="flex items-center justify-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm">Access System</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Preview */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/30">
        <div className="container mx-auto px-4">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent"
          >
            Mission-Critical Technology
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8" />,
                title: "AI Swarm Intelligence",
                description: "Coordinated autonomous robots that work together using advanced AI algorithms",
                color: "#00E6FF"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Debris Detection",
                description: "Advanced sensors and computer vision to identify and track space debris",
                color: "#FFB86B"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Precision Cleanup",
                description: "Safe and efficient collection of space junk without creating more debris",
                color: "#90EE90"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-700 hover:border-cyan-400/50 p-8 rounded-2xl transition-all duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-4xl font-bold mb-6 text-white">
              Ready to Explore the Future?
            </h3>
            <p className="text-xl mb-8 text-gray-300">
              Enter the mission control center and experience how 
              AI swarm robotics will revolutionize space cleanup.
            </p>
            <Link to="/mission-control">
              <Button 
                size="lg" 
                className="bg-cyan-400 text-black hover:bg-cyan-500 font-bold px-8 py-4 text-lg group shadow-lg hover:shadow-cyan-400/50 transition-all"
              >
                Enter Mission Control
                <Satellite className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;