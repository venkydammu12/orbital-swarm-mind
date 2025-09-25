import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Ring } from '@react-three/drei';
import { Mesh } from 'three';

const Earth = () => {
  const earthRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#4A90E2" 
        roughness={0.8}
        metalness={0.2}
        wireframe={false}
      />
    </Sphere>
  );
};

const Robot = ({ position, color }: { position: [number, number, number], color: string }) => {
  const robotRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (robotRef.current) {
      robotRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      robotRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={robotRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

const DebrisField = () => {
  const debris = Array.from({ length: 50 }, (_, i) => {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 4 + Math.random() * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = (Math.random() - 0.5) * 2;
    return { x, y, z, size: 0.05 + Math.random() * 0.1 };
  });

  return (
    <>
      {debris.map((piece, i) => (
        <mesh key={i} position={[piece.x, piece.y, piece.z]}>
          <sphereGeometry args={[piece.size]} />
          <meshStandardMaterial 
            color="#FF6B35" 
            emissive="#FF6B35"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </>
  );
};

const OrbitalVisualization = () => {
  return (
    <div className="w-full h-96 bg-background/50 rounded-lg overflow-hidden border border-border/30">
      <Canvas camera={{ position: [8, 5, 8], fov: 75 }}>
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E6FF" />

        {/* Earth */}
        <Earth />

        {/* Orbital Rings */}
        <Ring args={[4, 4.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00E6FF" opacity={0.3} transparent />
        </Ring>
        <Ring args={[6, 6.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#00E6FF" opacity={0.2} transparent />
        </Ring>

        {/* Robots */}
        <Robot position={[4.5, 0.5, 0]} color="#00E6FF" />
        <Robot position={[-3.5, 1, 2]} color="#00E6FF" />
        <Robot position={[2, -1.5, -4]} color="#00E6FF" />
        <Robot position={[-1, 2, 5]} color="#00E6FF" />

        {/* Debris Field */}
        <DebrisField />

        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          maxDistance={20}
          minDistance={5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg p-3">
        <p className="text-sm text-white/70">
          <span className="text-accent">●</span> Swarm Robots  
          <span className="text-orange-400 ml-4">●</span> Space Debris
        </p>
        <p className="text-xs text-white/50 mt-1">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
};

export default OrbitalVisualization;