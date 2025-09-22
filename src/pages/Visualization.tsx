import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Robot Swarm Component
const RobotSwarm = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Command Hub */}
      <Float speed={2} rotationIntensity={0.5}>
        <Box position={[0, 0, 0]} args={[1, 0.5, 1]}>
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} />
        </Box>
        <Text position={[0, 1, 0]} fontSize={0.2} color="#ffffff">
          Command Hub
        </Text>
      </Float>

      {/* Robot Swarm Units */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3}>
            <group position={[x, Math.sin(i) * 0.5, z]}>
              <Sphere args={[0.2]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
              </Sphere>
              <Box args={[0.1, 0.1, 0.4]} position={[0, 0, 0.3]}>
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
              </Box>
              <Text position={[0, 0.5, 0]} fontSize={0.1} color="#ffffff">
                Robot {i + 1}
              </Text>
            </group>
          </Float>
        );
      })}

      {/* Space Debris */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;
        
        return (
          <Float key={i} speed={0.5} rotationIntensity={0.8}>
            <Box position={[x, y, z]} args={[0.3, 0.1, 0.2]} rotation={[Math.random(), Math.random(), Math.random()]}>
              <meshStandardMaterial color="#ef4444" opacity={0.7} transparent />
            </Box>
          </Float>
        );
      })}
    </group>
  );
};

// Info Bubble Component
const InfoBubble = ({ title, description, position, isActive, onClick }: {
  title: string;
  description: string;
  position: 'left' | 'right' | 'top' | 'bottom';
  isActive: boolean;
  onClick: () => void;
}) => {
  const positionClasses = {
    left: 'left-8 top-1/2 -translate-y-1/2',
    right: 'right-8 top-1/2 -translate-y-1/2',
    top: 'top-8 left-1/2 -translate-x-1/2',
    bottom: 'bottom-8 left-1/2 -translate-x-1/2'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.1 : 1 }}
      className={`absolute ${positionClasses[position]} glass-card p-4 rounded-lg shadow-glow cursor-pointer max-w-xs z-10`}
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold text-accent mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const Visualization = () => {
  const [activeInfo, setActiveInfo] = React.useState<string>('detect');

  const infoSections = [
    {
      id: 'detect',
      title: 'Debris Detection',
      description: 'Advanced AI algorithms and sensors identify space debris using computer vision and LIDAR technology.',
      position: 'left' as const
    },
    {
      id: 'coordinate',
      title: 'Swarm Coordination',
      description: 'Robots communicate and coordinate their movements using distributed AI algorithms for efficient coverage.',
      position: 'top' as const
    },
    {
      id: 'collect',
      title: 'Collection System',
      description: 'Specialized robotic arms and nets safely capture debris without creating additional fragments.',
      position: 'right' as const
    },
    {
      id: 'storage',
      title: 'Storage & Disposal',
      description: 'Collected debris is stored in containment units and either recycled or safely disposed of.',
      position: 'bottom' as const
    }
  ];

  return (
    <div className="min-h-screen pt-20 space-bg">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            3D Project Visualization
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interact with our 3D model to explore how AI swarm robotics technology works in space
          </p>
        </motion.div>

        <div className="relative h-[600px] rounded-2xl overflow-hidden glass-card shadow-space">
          {/* 3D Canvas */}
          <Canvas camera={{ position: [5, 5, 5], fov: 75 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#22c55e" />
              <RobotSwarm />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Suspense>
          </Canvas>

          {/* Info Bubbles */}
          {infoSections.map((info) => (
            <InfoBubble
              key={info.id}
              title={info.title}
              description={info.description}
              position={info.position}
              isActive={activeInfo === info.id}
              onClick={() => setActiveInfo(info.id)}
            />
          ))}
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Click and drag to rotate • Scroll to zoom • Click info bubbles to learn more
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {infoSections.map((info) => (
              <button
                key={info.id}
                onClick={() => setActiveInfo(info.id)}
                className={`px-4 py-2 rounded-lg transition-smooth ${
                  activeInfo === info.id
                    ? 'bg-accent text-accent-foreground shadow-glow'
                    : 'glass-card text-foreground hover:bg-accent/10'
                }`}
              >
                {info.title}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualization;